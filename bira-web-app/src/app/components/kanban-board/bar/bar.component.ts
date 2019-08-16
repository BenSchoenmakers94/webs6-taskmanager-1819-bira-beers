import { Component, OnInit, Input } from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { Observable } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.sass']
})
export class BarComponent implements OnInit {

  @Input() columnList: any;
  @Input() columnProperty: any;
  @Input() moveableObject: Observable<any>;

  timePeriods = [
    'Bronze age',
    'Iron age',
    'Middle ages',
    'Early modern period',
    'Long nineteenth century'
  ];

  constructor(private store: DatastoreService) { }

  ngOnInit() {
  }

  checkSelected(value: any, propertyValue: any) {
    return value === propertyValue;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
  }
}
