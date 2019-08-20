import { Component, OnInit } from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  public activeSprintForChart: Observable<any>;
  public teams: any[];
  public teamNames: any[];

  constructor(private store: DatastoreService) {
  }

  ngOnInit() {
    this.activeSprintForChart = this.store.findObjectOfTypeWithConstraints('sprints', 'active', '==', true, 1);

    this.teams = [];
    this.teamNames = [];
    this.store.getAllFromType('teams').pipe(
      map(teams => {
        teams.forEach(team => {
          this.teams.push(this.store.findObjectOfType('teams', team['uid']));
          this.teamNames.push(team['name']);
        });
      }
      )).toPromise();
  }

}
