import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Observable, Subject } from 'rxjs';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  public userData: Observable<any>;
  private unSubscribe = new Subject();

  constructor(public auth: AuthService, private store: DatastoreService) {
  }

  ngOnInit() {
    this.auth.userLogged.pipe(takeUntil(this.unSubscribe)).subscribe(user => {
      if (user) {
        this.userData = this.store.findUser(user.uid);
      }
    });
  }

  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
