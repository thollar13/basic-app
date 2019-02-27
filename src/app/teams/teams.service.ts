import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Team } from './team.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class TeamsService {

  private teams: Team[] = [];
  private teamsUpdated = new Subject<{ teams: Team[]}>()

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getTeams(teamsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${teamsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string, teams: any, maxTeams: number }>('http://localhost:3000/api/teams' + queryParams)
      .pipe(map((teamData => {
        return { teams: teamData.teams.map(team => {
          return {
            name: team.name,
            id: team._id,
            imagePath: team.imagePath,
            creator: team.creator
          };
        }),
        maxTeams: teamData.maxTeams
      };
      })))
      .subscribe((transformedTeamData) => {
        console.log(transformedTeamData);
        this.teams = transformedTeamData.teams;
        this.teamsUpdated.next({
          teams: [...this.teams]
        });
      });
  }

  getTeamsMemberOf(userId: string) {
    console.log(userId);
    this.http
      .get<{ message: string, teams: any }>('http://localhost:3000/api/teams/member/' + userId)
      .pipe(map((teamData => {
        console.log(teamData);
        return { teams: teamData.teams.map(team => {
          return {
            name: team.name,
            id: team._id,
            imagePath: team.imagePath,
            creator: team.creator
          };
        })
      };
      })))
      .subscribe((transformedTeamData) => {
        this.teams = transformedTeamData.teams;
        this.teamsUpdated.next({
          teams: [...this.teams]
        });
      });
  }

  getTeamUpdateListener() {
    return this.teamsUpdated.asObservable();
  }

  getTeam(id: string) {
    return this.http.get<{
      _id: string;
      name: string;
      imagePath: string;
      creator: string;
    }>('http://localhost:3000/api/teams/' + id);
  }

  addTeam(name: string, image: File) {
    const teamData = new FormData();
    teamData.append('name', name);
    teamData.append('image', image, name);
    this.http.post<{message: string, team: Team}>('http://localhost:3000/api/teams', teamData)
    .subscribe((responseData) => {
      this.router.navigate(['/teams']);
    });
  }

  updateTeam(id: string, name: string, image: File | string) {
    let teamData: Team | FormData;
    if (typeof(image) === 'object') {
      teamData = new FormData();
      teamData.append('id', id);
      teamData.append('name', name);
      teamData.append('image', image, name);
    } else {
      teamData = {
        id: id,
        name: name,
        imagePath: image,
        creator: null
      }
    }
    this.http
      .put('http://localhost:3000/api/teams/' + id, teamData)
      .subscribe(response => {
        this.router.navigate(['/teams']);
      });
  }

  deleteTeam(teamId: string) {
    return this.http.delete('http://localhost:3000/api/teams/' + teamId);
  }

}
