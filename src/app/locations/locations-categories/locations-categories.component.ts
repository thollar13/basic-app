import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { LocationsService } from '../locations.service';
import { Location } from '../locations.model';
import { ItemsService } from 'src/app/items/items.service';


@Component({
  selector: 'app-locations-categories',
  templateUrl: './locations-categories.component.html',
  styleUrls: ['./locations-categories.component.scss']
})
export class LocationsCategoriesComponent implements OnInit {

  // @Input() locationsitems: any;

  location: Location;
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  locationId: string;

  constructor(
    public locationsService: LocationsService,
  ) {}

  ngOnInit() {

  }

}
