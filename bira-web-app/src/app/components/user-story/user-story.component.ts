import { Component, OnInit, Input } from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';

@Component({
  selector: 'app-user-story',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.sass']
})
export class UserStoryComponent implements OnInit {
  store: DatastoreService;
  @Input() story: any;
  user: any;

  constructor(store: DatastoreService) { this.store = store; }

  ngOnInit() {
    this.user = this.store.findUser(this.story.userId);
  }
}
