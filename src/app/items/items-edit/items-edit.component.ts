import { Component, OnInit, Inject } from '@angular/core';

import { LocationsService } from '../../locations/locations.service';
import { Location } from '../../locations/locations.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Item } from '../items.model';

@Component({
  selector: 'app-items-edit',
  templateUrl: './items-edit.component.html',
  styleUrls: ['./items-edit.component.scss']
})

export class ItemsEditComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ItemsEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item) {}


  ngOnInit() {}

}
