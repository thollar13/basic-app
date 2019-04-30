import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LocationsNewComponent } from './locations-new/locations-new.component';
import { LocationsIndexComponent } from './locations-index/locations-index.component';
import { LocationsShowComponent } from './locations-show/locations-show.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations: [
    LocationsIndexComponent,
    LocationsNewComponent,
    LocationsShowComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})

export class LocationsModule {}
