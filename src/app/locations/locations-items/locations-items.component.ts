import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { LocationsService } from '../locations.service';
import { Location } from '../locations.model';
import { ItemsService } from 'src/app/items/items.service';
import { Item } from 'src/app/items/items.model';


@Component({
  selector: 'app-locations-items',
  templateUrl: './locations-items.component.html',
  styleUrls: ['./locations-items.component.scss']
})
export class LocationsItemsComponent implements OnInit {

  @Input() locationsitems: any;

  location: Location;
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  locationId: string;
  // locationItems: any;
  private locationsSub: Subscription;
  private authStatusSub: Subscription;


  constructor(
    public locationsService: LocationsService,
    private itemsService: ItemsService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

  }

}
