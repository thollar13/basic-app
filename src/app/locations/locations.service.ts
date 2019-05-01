import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Location } from './location.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class LocationsService {

  private locations: Location[] = [];
  private locationsUpdated = new Subject<{ locations: Location[], locationCount: number }>()

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getLocations(locationsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${locationsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string, locations: any, maxlocations: number }>('http://localhost:3000/api/locations' + queryParams)
      .pipe(map((locationData => {
        return { locations: locationData.locations.map(location => {
          return {
            id: location._id,
            name: location.name,
            address: location.address,
            city: location.city,
            state: location.state,
            zip: location.zip,
            mId: location.mId,
            accessToken: location.accessToken,
            creator: location.creator
          };
        }),
        maxlocations: locationData.maxlocations
      };
      })))
      .subscribe((transformedLocationData) => {
        console.log(transformedLocationData);
        this.locations = transformedLocationData.locations;
        this.locationsUpdated.next({
          locations: [...this.locations],
          locationCount: transformedLocationData.maxlocations
        });
      });
  }

  getLocationUpdateListener() {
    return this.locationsUpdated.asObservable();
  }

  getLocation(id: string) {
    return this.http.get<{
      _id: string;
      name: string;
      address: string;
      city: string;
      state: string;
      mId: string;
      zip: string;
      accessToken: string;
      creator: string;
    }>('http://localhost:3000/api/locations/' + id);
  }

  addLocation(mId: string, accessToken: string) {
    const locationData = new URLSearchParams();
    locationData.set('mId', mId);
    locationData.set('accessToken', accessToken);

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    this.http.post<{message: string, locations: Location}>('http://localhost:3000/api/locations/create', locationData.toString(), options)
    .subscribe((responseData) => {
      this.router.navigate(['/locations/' + responseData.locations.id]);
    }, error => {
      /// need error handling
      console.log("error")
    });
  }

  updateLocation(
    id: string,
    name: string,
    address: string,
    city: string,
    state: string,
    mId: string,
    accessToken: string,
  ) {
    let locationData: Location | FormData;
    locationData = new FormData();
    locationData.append('id', id);
    locationData.append('name', name);
    locationData.append('address', address);
    locationData.append('city', city);
    locationData.append('state', state);
    locationData.append('mId', mId);
    locationData.append('accessToken', accessToken);
    this.http
      .put('http://localhost:3000/api/locations/' + id, locationData)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  deleteLocation(locationId: string) {
    return this.http.delete('http://localhost:3000/api/locations/' + locationId);
  }

  getLocationCategories(mId: string) {
    return this.http.get<{ message: string, categories: any }>('http://localhost:3000/api/categories?mid=' + mId);
  }

}
