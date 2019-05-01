import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { LocationsHeaderComponent } from './locations-header/locations-header.component';
import { LocationsItemsComponent } from './locations-items/locations-items.component';
import { LocationsNewComponent } from './locations-new/locations-new.component';
import { LocationsCategoriesComponent } from './locations-categories/locations-categories.component';

const locationRoutes: Routes = [
  {
    path: 'locations/:id',
    component: LocationsHeaderComponent,
    children: [
      {
        path: 'items',
        component: LocationsItemsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'categories',
        component: LocationsCategoriesComponent,
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
