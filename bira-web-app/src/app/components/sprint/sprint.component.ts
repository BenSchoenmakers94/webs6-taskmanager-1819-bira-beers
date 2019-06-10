import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.sass']
})
export class SprintComponent implements OnInit {

  @Input() sprint: any;
  store: DatastoreService;
  userStories: Observable<any>;

  constructor(store: DatastoreService) {
    this.store = store;
   }

  ngOnInit() {
    this.userStories = this.store.userStoriesForSprint(this.sprint.uid);
  }

}
