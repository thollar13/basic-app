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

  @Output() toggleCategoryVisibility: EventEmitter<object> = new EventEmitter<object>();

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

  toggleVisibility(id, event, cloverId) {
    const lid = this.locationId;
    this.toggleCategoryVisibility.emit({id, event, cloverId });
  }
}
