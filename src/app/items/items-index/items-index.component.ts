import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { LocationsService } from '../../locations/locations.service';
import { Location } from '../../locations/locations.model';
import { ItemsEditComponent } from '../items-edit/items-edit.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-locations-items',
  templateUrl: './items-index.component.html',
  styleUrls: ['./items-index.component.scss']
})

export class ItemsIndexComponent implements OnInit {

  @Input() locationsitems: any;

  @Output() toggleItemVisibility: EventEmitter<object> = new EventEmitter<object>();

  location: Location;
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  locationId: string;

  constructor(
    public locationsService: LocationsService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {

  }

  editItem(id) {
    console.log(id);
    const dialogRef = this.dialog.open(ItemsEditComponent, {
      width: '700px',
      height: '500px',
      data: { name: this.userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed');
    });
  }

  toggleVisibility(id, event, cloverId) {
    this.toggleItemVisibility.emit({id, event, cloverId });
  }

}
