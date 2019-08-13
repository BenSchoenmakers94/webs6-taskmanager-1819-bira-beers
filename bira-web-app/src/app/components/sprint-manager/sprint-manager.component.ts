import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sprint-manager',
  templateUrl: './sprint-manager.component.html',
  styleUrls: ['./sprint-manager.component.sass']
})
export class SprintManagerComponent implements OnInit {

  public sprints: Observable<any>;

  constructor(auth: AuthService, store: DatastoreService) {
    auth.userLogged.subscribe(user => {
      this.sprints = store.sprintsForTeam(user.teamId);
    });
  }

  ngOnInit() {
  }

}
