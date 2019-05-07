import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsNewComponent } from './locations-new/locations-new.component';
import { LocationsIndexComponent } from './locations-index/locations-index.component';
import { LocationsDashboardComponent } from './locations-dashboard/locations-dashboard.component';


import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material.module';

import { ItemsIndexComponent } from '../items/items-index/items-index.component';
import { CategoriesIndexComponent } from '../categories/categories-index/categories-index.component';
import { LocationsHeaderComponent } from '../header/locations-header/locations-header.component';
import { OrdersIndexComponent } from '../orders/orders-index/orders-index.component';
import { ItemsEditComponent } from '../items/items-edit/items-edit.component';


@NgModule({
  declarations: [
    LocationsHeaderComponent,
    LocationsDashboardComponent,
    LocationsIndexComponent,
    LocationsNewComponent,
    CategoriesIndexComponent,
    ItemsIndexComponent,
    ItemsEditComponent,
    OrdersIndexComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    LocationsRoutingModule
  ],
  exports: [
    LocationsHeaderComponent,
  ]
})

export class LocationsModule {}
