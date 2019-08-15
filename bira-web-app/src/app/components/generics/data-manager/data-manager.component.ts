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

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.url.subscribe(item => {
      this.type = item[0].path;
    });
  }

  goToCreation() {
    this.router.navigateByUrl('/' + this.type + '/add');
  }
}
