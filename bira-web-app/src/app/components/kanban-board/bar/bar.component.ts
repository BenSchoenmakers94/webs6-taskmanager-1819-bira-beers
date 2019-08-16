import { Component, OnInit, Input } from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.sass']
})
export class BarComponent implements OnInit {

  @Input() columnList: any;
  @Input() columnProperty: any;
  @Input() moveableObject: Observable<any>;

  constructor(private store: DatastoreService) { }

  ngOnInit() {
  }

  checkSelected(value: any, propertyValue: any) {
    return value === propertyValue;
  }
}
