import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { first } from 'rxjs/operators';
import { NiceTextService } from 'src/app/services/nice-text.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.sass']
})

export class DataTableComponent implements OnInit {
  @Input() type: any;

  dataSource: BindableDataSource;
  displayedColumns: any[]
  constructor(public store: DatastoreService, public textify: NiceTextService) { }

  ngOnInit() {
    this.dataSource = new BindableDataSource(this.store, this.type);
    this.getColumns();
  }

  getColumns() {
    this.dataSource.connect().pipe(first()).subscribe(object => {
      this.displayedColumns = Object.getOwnPropertyNames(object[0]);
    });
  }
}

export class BindableDataSource extends DataSource<any> {

  public dataSource: Observable<any>;

  constructor(public store: DatastoreService, private type: any) {
  super();
  }

  connect() {
    this.dataSource = this.store.getAllFromType(this.type);
    return this.dataSource;
  }

  disconnect() {
  }
}
