import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { LocationsService } from '../../locations/locations.service';
import { Location } from '../../locations/locations.model';



@Component({
  selector: 'app-locations-categories',
  templateUrl: './categories-index.component.html',
  styleUrls: ['./categories-index.component.scss']
})
export class CategoriesIndexComponent implements OnInit {

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
    this.syncCategories.emit({mId, accessToken});
  }

  toggleVisibility(id, event, cloverId) {
    this.toggleCategoryVisibility.emit({id, event, cloverId });
  }
}
