import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.sass']
})
export class KanbanBoardComponent implements OnInit {

  @Input() columnType: Observable<any>;
  @Input() moveables: Observable<any>;
  @Input() workingObject?: Observable<any>;
  @Input() columnProperty: any;
  @Input() moveableProperty: any;

  public Object = Object;
  public columnsList: any[];

  constructor(
    private store: DatastoreService,
    private router: Router) { }

  ngOnInit() {
    this.redraw();
  }

  redraw() {
    this.columnsList = [];
    this.columnType.subscribe(x => {
      const newList = [];
      x.forEach(element => {
        newList.push({
          propertyName: element.name,
          items: []
        });
      });
      newList.forEach(newLister => {
        this.columnsList.forEach(list => {
          if (newLister.propertyName === list.propertyName) {
            newLister.items = list.items;
          }
        });
      });
      this.columnsList = newList;
    });
    this.moveables.subscribe(y => {
      this.columnsList.forEach(listItem => {
        listItem.items = [];
      });
      y.forEach(element => {
        this.columnsList.forEach(object => {
          if (object.propertyName === element[this.columnProperty]) {
            let canAdd = true;
            object.items.forEach(item => {
              if (item.uid === element.uid) {
                canAdd = false;
              }
            });
            if (canAdd) { object.items.push(element); }
          }
        });
      });
    });
  }

  toDetail(object: any) {
    this.router.navigateByUrl('/' + this.moveableProperty + '/' + object.uid);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.dropFinished(event);
    }
  }

  dropFinished(event: CdkDragDrop<string[]>) {
    const selector = event.container.id.substring(event.container.id.lastIndexOf('-') + 1, event.container.id.length);
    event.container.data.forEach(value => {
      const copy = JSON.parse(JSON.stringify(value));
      copy[this.columnProperty] = this.columnsList[selector].propertyName;
      this.store.updateDocument(this.moveableProperty, copy.uid, copy);
    });
  }
}
