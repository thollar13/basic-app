import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { LocationsService } from '../../locations/locations.service';
import { Location } from '../../locations/locations.model';
import { ItemsService } from 'src/app/items/items.service';
import { Item } from 'src/app/items/items.model';


@Component({
  selector: 'app-locations-orders',
  templateUrl: './orders-index.component.html',
  styleUrls: ['./orders-index.component.scss']
})
export class OrdersIndexComponent implements OnInit {

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
