import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {

  public userData: Observable<User>;

  constructor(public auth: AuthService, db: AngularFirestore) {
    this.auth.userLogged.subscribe(user => {
      if (user) {
        this.userData = db.collection('users').doc<User>(user.uid).valueChanges();
      }
    });
  }

  ngOnInit() {
  }

}
