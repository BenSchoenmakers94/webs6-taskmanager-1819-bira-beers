import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  title = 'bira-web-app';

  public items: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.items = db.collection('/users').valueChanges();
  }

  ngOnInit() {
  }

}
