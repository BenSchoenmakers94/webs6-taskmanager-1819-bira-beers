import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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

  public Object = Object;
  public columnsList: any[];
  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  constructor(
    private store: DatastoreService) { }

  ngOnInit() {
    this.redraw();
  }

  redraw() {
    this.columnsList = [];
    this.columnType.subscribe(x => {
      x.forEach(element => {
        this.columnsList.push({
          propertyName: element.name,
          items: []
        });
      });
    });
    this.moveables.subscribe(y => {
      y.forEach(element => {
        this.columnsList.forEach(object => {
          if (object.propertyName === element[this.columnProperty]) {
            object.items.push(element);
          }
        });
      });
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
