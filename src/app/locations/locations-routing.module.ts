import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { LocationsNewComponent } from './locations-new/locations-new.component';

import { ItemsIndexComponent } from '../items/items-index/items-index.component';
import { ItemsEditComponent } from '../items/items-edit/items-edit.component';

import { LocationsHeaderComponent } from '../header/locations-header/locations-header.component';
import { CategoriesIndexComponent } from '../categories/categories-index/categories-index.component';

const locationRoutes: Routes = [
  {
    path: 'locations/:id',
    component: LocationsHeaderComponent,
    children: [
      {
        path: 'items',
        component: ItemsIndexComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'items/:id/edit',
        component: ItemsEditComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'categories',
        component: CategoriesIndexComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'edit',
        component: LocationsNewComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(locationRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LocationsRoutingModule {}
