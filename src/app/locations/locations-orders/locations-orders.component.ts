import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { LocationsService } from '../locations.service';
import { Location } from '../locations.model';
import { ItemsService } from 'src/app/items/items.service';
import { Item } from 'src/app/items/items.model';


@Component({
  selector: 'app-locations-orders',
  templateUrl: './locations-orders.component.html',
  styleUrls: ['./locations-orders.component.scss']
})
export class LocationsOrdersComponent implements OnInit {

  isLoading = true;
  location: Location;
  userIsAuthenticated = false;
  userId: string;
  locationId: string;
  locationItems: any;


  constructor(
    public locationsService: LocationsService,

  ) {}

  ngOnInit() {


  }

}
