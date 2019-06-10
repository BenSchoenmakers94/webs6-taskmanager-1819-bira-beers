import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  title = 'bira-web-app';

  public sprints: Observable<any>;

  constructor(auth: AuthService, store: DatastoreService) {
    auth.userLogged.subscribe(user => {
      this.sprints = store.sprintsForTeam(user.teamId);
    });
  }

  ngOnInit() {
  }

}
