import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { LocationsService } from '../locations.service';
import { Location } from '../locations.model';

@Component({
  selector: 'app-locations-items',
  templateUrl: './locations-items.component.html',
  styleUrls: ['./locations-items.component.scss']
})

export class LocationsItemsComponent implements OnInit {

  @Input() locationsitems: any;

  @Output() toggleItemVisibility: EventEmitter<object> = new EventEmitter<object>();

  location: Location;
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  locationId: string;

  // totalItems = 0;
  // itemsPerPage = 25;
  // currentPage = 1;
  // pageSizeOptions = [25, 50, 100];
  // displayedColumns: string[] = ['name', 'price'];
  // dataSource = new MatTableDataSource(this.locationsitems);

  constructor(
    public locationsService: LocationsService,
  ) {}

  ngOnInit() {

  }

  editItem(id) {
    console.log(id);
  }

  toggleVisibility(id, event, cloverId) {
    this.toggleItemVisibility.emit({id, event, cloverId });
  }

}
