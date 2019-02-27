import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Team } from '../team.model';
import { TeamsService } from "../teams.service";
import { AuthService } from "src/app/auth/auth.service";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: 'app-team-single',
  templateUrl: './team-single.component.html',
  styleUrls: ['./team-single.component.css']
})
export class TeamSingleComponent implements OnInit, OnDestroy {

  private teamsSub: Subscription;
  team = {};
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  private teamId: string;
  private authStatusSub: Subscription;

  constructor(
    public teamsService: TeamsService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.isLoading = true;
        this.userId = this.authService.getUserId();
        this.teamId = paramMap.get('id');
        this.teamsSub = this.teamsService.getTeam(this.teamId).subscribe((team) => {
          this.isLoading = false;
          this.team = team;
        });
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatusSub = this.authService
          .getAuthStatusListener()
            .subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
            this.userId = this.authService.getUserId();
          });

      }
    });

  }

  ngOnDestroy() {
    this.teamsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
