import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { NiceTextService } from 'src/app/services/nice-text.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.sass']
})

export class DataTableComponent implements OnInit {
  @Input() type: any;
  @Output() selectionChanged: EventEmitter<any> = new EventEmitter();

  dataSource: BindableDataSource;
  displayedColumns: any[];
  constructor(
    public store: DatastoreService,
    public textify: NiceTextService,
    private router: Router) { }

  ngOnInit() {
    this.dataSource = new BindableDataSource(this.store, this.type);
    this.store.getPropertiesOfType(this.type).subscribe(properties => {
      this.displayedColumns = Object.getOwnPropertyNames(properties);
    });
  }

  goToDetail(row: any) {
    this.router.navigateByUrl(this.router.url + '/' + row.uid);
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
