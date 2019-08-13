import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {

  public userData: Observable<any>;

  constructor(public auth: AuthService, store: DatastoreService) {
    this.auth.userLogged.subscribe(user => {
      if (user) {
        this.userData = store.findUser(user.uid);
      }
    });
  }

  ngOnInit() {
  }

}
