import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsItemsComponent } from './locations-items/locations-items.component';
import { LocationsHeaderComponent } from './locations-header/locations-header.component';
import { LocationsNewComponent } from './locations-new/locations-new.component';
import { LocationsIndexComponent } from './locations-index/locations-index.component';
import { LocationsShowComponent } from './locations-show/locations-show.component';
import { LocationsCategoriesComponent } from './locations-categories/locations-categories.component';

import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations: [
    LocationsHeaderComponent,
    LocationsIndexComponent,
    LocationsNewComponent,
    LocationsShowComponent,
    LocationsCategoriesComponent,
    LocationsItemsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    LocationsRoutingModule
  ],
  exports: [
    LocationsHeaderComponent
  ]
})

export class LocationsModule {}
