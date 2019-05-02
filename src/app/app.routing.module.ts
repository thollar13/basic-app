import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthDashboardComponent } from './auth/dashboard/dashboard.component';

import { LocationsIndexComponent } from './locations/locations-index/locations-index.component';
import { LocationsNewComponent } from './locations/locations-new/locations-new.component';

const routes: Routes = [
  { path: '', component: LocationsIndexComponent },

  //// LOCATIONS
  {
    path: 'locations/new',
    component: LocationsNewComponent,
    canActivate: [AuthGuard]
  },

  //// AUTH
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
