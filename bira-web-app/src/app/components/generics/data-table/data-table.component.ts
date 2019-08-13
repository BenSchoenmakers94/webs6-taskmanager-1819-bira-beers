import { Component, OnInit, Input } from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.sass']
})

export class DataTableComponent implements OnInit {

  public console = console;
  @Input() type: any;

  dataSource: BindableDataSource;
  displayedColumns: any[];
  constructor(public store: DatastoreService) { }

  ngOnInit() {
    this.dataSource = new BindableDataSource(this.store, this.type);
    this.getColumns();
  }

  getColumns() {
    this.dataSource.connect().pipe(first()).subscribe(object => {
      this.displayedColumns = Object.getOwnPropertyNames(object[0]);
      this.console.log(this.displayedColumns)
    });
  }
}

export class BindableDataSource extends DataSource<any> {

  dataSource: Observable<any>;

  constructor(public store: DatastoreService, private type: any) {
  super();
  }

  connect() {
    this.dataSource = this.store.getAllFromType(this.type)
    return this.dataSource;
  }

  disconnect() {
  }
}
