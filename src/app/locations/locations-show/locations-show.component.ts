import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { LocationsService } from '../locations.service';
import { Location } from '../locations.model';
import { ItemsService } from 'src/app/items/items.service';
import { Item } from 'src/app/items/items.model';


@Component({
  selector: 'app-locations-show',
  templateUrl: './locations-show.component.html',
  styleUrls: ['./locations-show.component.scss']
})
export class LocationsShowComponent implements OnInit {

  location: Location;
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  locationId: string;
  locationItems: any;
  private locationsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public locationsService: LocationsService,
    private itemsService: ItemsService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoading = true;
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

        });
      }
    });
  }

}
