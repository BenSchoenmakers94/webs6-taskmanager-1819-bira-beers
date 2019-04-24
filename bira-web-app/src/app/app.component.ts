import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'bira-web-app';

  public items: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.items = db.collection('/users').valueChanges();
  }
}
