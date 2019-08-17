import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { NiceTextService } from 'src/app/services/nice-text.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-data-manager',
  templateUrl: './data-manager.component.html',
  styleUrls: ['./data-manager.component.sass']
})
export class DataManagerComponent implements OnInit, OnDestroy {

  public type: any;

  private unSubscribe = new Subject();

  constructor(
    public route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.url.pipe(takeUntil(this.unSubscribe)).subscribe(item => {
      this.type = item[0].path;
    });
  }

  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  goToCreation() {
    this.router.navigateByUrl('/' + this.type + '/add');
  }
}
