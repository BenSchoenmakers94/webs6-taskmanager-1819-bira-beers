import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { Observable, Subject } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { NiceTextService } from 'src/app/services/nice-text.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.sass']
})

export class DataTableComponent implements OnInit, OnDestroy {
  @Input() type: any;
  @Output() selectionChanged: EventEmitter<any> = new EventEmitter();

  dataSource: BindableDataSource;
  displayedColumns: any[];

  private unSubscribe = new Subject();

  constructor(
    public store: DatastoreService,
    public textify: NiceTextService,
    private router: Router) { }

  ngOnInit() {
    this.dataSource = new BindableDataSource(this.store, this.type);
    if (this.type === 'archive') {
      this.store.getPropertiesOfType('userStories').pipe(takeUntil(this.unSubscribe)).subscribe(properties => {
        this.displayedColumns = Object.getOwnPropertyNames(properties);
      });
    } else {
      this.store.getPropertiesOfType(this.type).pipe(takeUntil(this.unSubscribe)).subscribe(properties => {
        this.displayedColumns = Object.getOwnPropertyNames(properties);
      });
    }
  }

  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  goToDetail(row: any) {
    if(this.type === 'archive') {
      this.router.navigateByUrl('/userStories/' + row.uid);
    } else {
      this.router.navigateByUrl(this.router.url + '/' + row.uid);
    }
  }
}

export class BindableDataSource extends DataSource<any> {

  public dataSource: Observable<any>;

  constructor(public store: DatastoreService, private type: any) {
  super();
  }

  connect() {
    if (this.type === 'userStories') {
      this.dataSource = this.store.findObjectOfTypeWithConstraints(this.type, 'isArchived', '==', false, -1);
    } else if (this.type === 'archive') {
      this.dataSource = this.store.findObjectOfTypeWithConstraints('userStories', 'isArchived', '==', true, -1);
    } else {
      this.dataSource = this.store.getAllFromType(this.type);
    }
    return this.dataSource;
  }

  disconnect() {
  }
}
