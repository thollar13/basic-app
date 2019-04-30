import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Location } from '../locations.model';
import { LocationsService } from '../locations.service';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations-index.component.html',
  styleUrls: ['./locations-index.component.scss']
})
export class LocationsIndexComponent implements OnInit, OnDestroy{

  locations: Location[] = [];
  isLoading = false;
  totalLocations = 0;
  locationsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private locationsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public locationsService: LocationsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.locationsService.getLocations(this.locationsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.locationsSub = this.locationsService.getLocationUpdateListener()
      .subscribe((locationData: { locations: Location[], locationCount: number }) =>  {
        this.isLoading = false;
        this.totalLocations = locationData.locationCount;
        this.locations = locationData.locations;
      });
      this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.locationsPerPage = pageData.pageSize;
    this.locationsService.getLocations(this.locationsPerPage, this.currentPage);
  }

  onDelete(locationId: string) {
    this.isLoading = true;
    this.locationsService.deleteLocation(locationId).subscribe(() => {
      this.locationsService.getLocations(this.locationsPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.locationsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
