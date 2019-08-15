import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NiceTextService } from 'src/app/services/nice-text.service';

@Component({
  selector: 'app-data-manager',
  templateUrl: './data-manager.component.html',
  styleUrls: ['./data-manager.component.sass']
})
export class DataManagerComponent implements OnInit {

  public type: any;
  public selectedObservable: Observable<any>;

  constructor(
    private store: DatastoreService,
    private route: ActivatedRoute,
    private textify: NiceTextService,
    private router: Router) { }

  ngOnInit() {
    this.route.url.subscribe(item => {
      this.type = item[0].path;
    });
  }

  selectionChangedHandler(selected: any) {
   this.selectedObservable = this.store.findObjectOfType(this.type, selected.uid);
  }

  goToCreation() {
    this.router.navigateByUrl('/' + this.type + '/add')
  }
}
