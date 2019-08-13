import { Component, OnInit } from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.sass']
})
export class UserManagerComponent implements OnInit {

  public selectedObservable: any;


  constructor(private store: DatastoreService) { }

  ngOnInit() {
  }

  selectionChangedHandler(selected: any) {
    //this.selectedItem = selected;
    console.log(selected);
  }
}
