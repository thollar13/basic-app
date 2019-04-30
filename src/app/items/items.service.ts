import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from './items.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ItemsService {

  private items: Item[] = [];
  private itemsUpdated = new Subject<{ items: Item[], itemsCount: number }>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getItems(mId: string, itemsPerPage: number, currentPage: number) {
    const queryParams = `?mid=${mId}&pagesize=${itemsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string, items: any, maxitems: number }>('http://localhost:3000/api/items' + queryParams)
      .pipe(map((itemData => {
        return { items: itemData.items.map(item => {
          return {
            id: item._id,
            name: item.name,
            price: item.price,
            priceType: item.priceType,
            isHidden: item.isHidden,
            cloverHiddenValue: item.cloverHiddenValue,
            cloverId: item.cloverId,
            mId: item.mId
          };
        }),
        maxitems: itemData.maxitems
      };
      })))
      .subscribe((transformedItemsData) => {
        console.log(transformedItemsData);
        this.items = transformedItemsData.items;
        this.itemsUpdated.next({
          items: [...this.items],
          itemsCount: transformedItemsData.maxitems
        });
      });
  }

  getItemsUpdateListener() {
    return this.itemsUpdated.asObservable();
  }

  getLocationItems(mId: string) {
    return this.http.get<{ message: string, items: any }>('http://localhost:3000/api/items?mid=' + mId);
  }

  // updateLocation(
  //   id: string,
  //   name: string,
  //   address: string,
  //   city: string,
  //   state: string,
  //   mId: string,
  //   accessToken: string,
  // ) {
  //   let locationData: Location | FormData;
  //   locationData = new FormData();
  //   locationData.append('id', id);
  //   locationData.append('name', name);
  //   locationData.append('address', address);
  //   locationData.append('city', city);
  //   locationData.append('state', state);
  //   locationData.append('mId', mId);
  //   locationData.append('accessToken', accessToken);
  //   this.http
  //     .put('http://localhost:3000/api/locations/' + id, locationData)
  //     .subscribe(response => {
  //       this.router.navigate(['/']);
  //     });
  // }

}
