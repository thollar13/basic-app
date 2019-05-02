import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LocationsService } from '../locations.service';
import { ItemsService } from 'src/app/items/items.service';
import { Location } from '../locations.model';

@Component({
  selector: 'app-locations-header',
  templateUrl: './locations-header.component.html',
  styleUrls: ['./locations-header.component.scss']
})
export class LocationsHeaderComponent implements OnInit, OnDestroy {

  view: string;
  isLoading = true;

  location: Location;
  locationId: string;
  locationItems: any;
  locationCategories: any;
  showLocationItems = false;
  showRoute = false;

  constructor(
    private locationsService: LocationsService,
    private itemsService: ItemsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    if(this.route.snapshot.firstChild) {
      this.view = this.route.snapshot.children[0].url[0].path;
    } else {
      this.view = 'dashboard';
    }
    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      if (paramMap.has('id')) {

        this.locationId = paramMap.get('id');
        this.locationsService.getLocation(this.locationId).subscribe(locationData => {
          this.isLoading = false;
          this.location = {
            id: locationData._id,
            name: locationData.name,
            address: locationData.address,
            city: locationData.city,
            state: locationData.state,
            zip: locationData.zip,
            mId: locationData.mId,
            accessToken: locationData.accessToken,
            creator: null,
          };
          this.itemsService.getLocationItems(this.location.mId).subscribe((result) => {
            this.locationItems = result.items;
          });
          this.locationsService.getLocationCategories(this.location.mId).subscribe((result) => {
            this.locationCategories = result.categories;
          });
          this.isLoading = false;
        });

      }
    });
  }

  viewChange(viewChange) {
    this.view = viewChange;
  }

  syncCategories(event) {
    this.locationsService.syncCategories(event).subscribe((result) => {
      if (result.message === 'success') {
        console.log(result.categories)
        //// go through each of the returned results and if it's not included in the array, include it.
        this.locationCategories = result.categories;
      }
    });
  }

  categoryVisibilityToggle(event) {
    this.locationsService.toggleCategoryVisibility(event).subscribe((result) => {
      if (result.message === 'success') {
        this.locationCategories.find(o => o.cloverId === event.cloverId).isVisible = event.event.checked;
      }
    });
  }

  itemVisibilityToggle(event) {
    this.locationsService.toggleItemVisibility(event).subscribe((result) => {
      if (result.message === 'success') {
        this.locationItems.find(o => o.cloverId === event.cloverId).isVisible = event.event.checked;
      }
    });
  }

  ngOnDestroy() {
    // this.authListenerSubs.unsubscribe();
  }

}
