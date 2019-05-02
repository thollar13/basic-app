import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Item } from '../items.model';
import { ItemsService } from '../items.service';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations-index.component.html',
  styleUrls: ['./locations-index.component.scss']
})
export class ItemsIndexComponent implements OnInit, OnDestroy{

  items: Item[] = [];
  isLoading = false;
  totalItems = 0;
  itemsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private itemsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public itemsService: ItemsService,
    private authService: AuthService
  ) {}

  ngOnInit() {

    // this.isLoading = true;
    // this.userIsAuthenticated = this.authService.getIsAuth();

    // this.authStatusSub = this.authService
    //   .getAuthStatusListener()
    //   .subscribe(isAuthenticated => {
    //     this.userIsAuthenticated = isAuthenticated;
    //     this.userId = this.authService.getUserId();
    //   });

    // this.itemsService.getItems(this.itemsPerPage, this.currentPage);
    // this.userId = this.authService.getUserId();
    // this.itemsSub = this.itemsService.getItemsUpdateListener()
    //   .subscribe((itemData: { items: Item[], itemCount: number }) =>  {
    //     this.isLoading = false;
    //     this.totalItems = itemData.itemCount;
    //     this.items = itemData.items;
    //   });

  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.itemsPerPage = pageData.pageSize;
    // this.itemsService.getItems(this.itemsPerPage, this.currentPage);
  }

  // onDelete(locationId: string) {
  //   this.isLoading = true;
  //   this.itemsService.deleteItem(locationId).subscribe(() => {
  //     this.itemsService.getItems(this.itemsPerPage, this.currentPage);
  //   });
  // }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
