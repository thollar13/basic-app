import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsItemsComponent } from './locations-items/locations-items.component';
import { LocationsHeaderComponent } from './locations-header/locations-header.component';
import { LocationsNewComponent } from './locations-new/locations-new.component';
import { LocationsIndexComponent } from './locations-index/locations-index.component';
import { LocationsDashboardComponent } from './locations-dashboard/locations-dashboard.component';
import { LocationsCategoriesComponent } from './locations-categories/locations-categories.component';
import { LocationsOrdersComponent } from './locations-orders/locations-orders.component';

import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material.module';


@NgModule({
  declarations: [
    LocationsHeaderComponent,
    LocationsDashboardComponent,
    LocationsIndexComponent,
    LocationsNewComponent,
    LocationsCategoriesComponent,
    LocationsItemsComponent,
    LocationsOrdersComponent
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
