import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  userIsSuperAdmin = false;
  userRole = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.authService.autoAuthUser();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
    this.authService.getUserRole()
    .subscribe(isAdmin => {
      console.log(isAdmin);
      this.userIsSuperAdmin = isAdmin;
    });
  }

  onLogout() {
    this.userIsSuperAdmin = false;
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
