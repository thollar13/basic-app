import { Component, OnInit, Input } from '@angular/core';

import { LocationsService } from '../locations.service';
import { Location } from '../locations.model';



@Component({
  selector: 'app-locations-categories',
  templateUrl: './locations-categories.component.html',
  styleUrls: ['./locations-categories.component.scss']
})
export class LocationsCategoriesComponent implements OnInit {

  @Input() locationscategories: any;

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

  editCategory(id) {
    console.log(id);
  }

  syncCategories(mId){
    console.log(mId)
  }
}
