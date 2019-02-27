import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { TeamsCreateComponent } from './teams/team-create/team-create.component';
import { TeamListComponent } from './teams/teams-list/teams-list.component';
import { TeamSingleComponent } from './teams/team-single/team-single.component';


const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard]},
  { path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  /// TEAMS
  { path: 'teams', component: TeamListComponent },
  { path: 'teams/create', component: TeamsCreateComponent, canActivate: [AuthGuard] },
  { path: 'teams/:id', component: TeamSingleComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
