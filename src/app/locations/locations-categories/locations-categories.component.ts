import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { LocationsService } from '../locations.service';
import { Location } from '../locations.model';



@Component({
  selector: 'app-locations-categories',
  templateUrl: './locations-categories.component.html',
  styleUrls: ['./locations-categories.component.scss']
})
export class LocationsCategoriesComponent implements OnInit {

  @Input() locationscategories: any;
  @Input() location: Location;

  @Output() toggleCategoryVisibility: EventEmitter<object> = new EventEmitter<object>();
  @Output() syncCategories: EventEmitter<object> = new EventEmitter<object>();

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

  syncLocationCategories(mId, accessToken){
    console.log("hit")
    this.syncCategories.emit({mId, accessToken});
  }

  toggleVisibility(id, event, cloverId) {
    this.toggleCategoryVisibility.emit({id, event, cloverId });
  }
}
