import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Team } from '../team.model';
import { TeamsService } from '../teams.service';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css']
})
export class TeamListComponent implements OnInit, OnDestroy{

  teams: Team[] = [];
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  private teamsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public teamsService: TeamsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.teamsService.getTeamsMemberOf(this.userId);
    this.teamsSub = this.teamsService.getTeamUpdateListener()
      .subscribe((teamData: { teams: Team[], teamCount: number }) =>  {
        this.isLoading = false;
        this.teams = teamData.teams;
      });
      this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onDelete(teamId: string) {
    this.isLoading = true;
    this.teamsService.deleteTeam(teamId).subscribe(() => {
      this.teamsService.getTeamsMemberOf(this.userId);
    });
  }

  ngOnDestroy() {
    this.teamsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
