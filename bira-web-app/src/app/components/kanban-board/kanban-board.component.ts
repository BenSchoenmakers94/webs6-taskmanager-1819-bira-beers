import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { DropEvent } from 'ng-drag-drop';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styles: [`
  div.scroll-list {
    overflow: auto;
    max-height: 70vh;
  }
  .drag-over {
    border: #ff525b dashed 2px;
  }
  .drag-hint {
    border: #ffc100 dashed 2px;
  }
  .drag-target-border {
    border: #00bfff dashed 2px;
  }
  .drag-target-border-green {
    border: #3c763d dashed 2px;
  }
`
]
})
export class KanbanBoardComponent {

//   @Input() columnType: Observable<any>;
//   @Input() moveables: Observable<any>;
//   @Input() workingObject?: Observable<any>;
//   @Input() columnProperty: any;

//   public Object = Object;
//   public columnsList: any[];
//   constructor(
//     private store: DatastoreService) { }

//   ngOnInit() {
//     this.redraw();
//   }

//   redraw() {
//     this.columnsList = [];
//     return this.columnType.subscribe(x => {
//       x.forEach(element => {
//         if (!this.columnsList.includes(element.name)) {
//           this.columnsList.push(element.name);
//         }
//       });
//       //this.cdr.detectChanges();
//     });
//   }

// }
vegetables = [
  {name: 'Carrot', type: 'vegetable'},
  {name: 'Onion', type: 'vegetable'},
  {name: 'Potato', type: 'vegetable'},
  {name: 'Capsicum', type: 'vegetable'}];

fruits = [
  {name: 'Apple', type: 'fruit'},
  {name: 'Orange', type: 'fruit'},
  {name: 'Mango', type: 'fruit'},
  {name: 'Banana', type: 'fruit'}];

droppedFruits = [];
droppedVegetables = [];
droppedItems = [];
fruitDropEnabled = true;
dragEnabled = true;

onFruitDrop(e: DropEvent) {
  this.droppedFruits.push(e.dragData);
  this.removeItem(e.dragData, this.fruits);
}

onVegetableDrop(e: DropEvent) {
  this.droppedVegetables.push(e.dragData);
  this.removeItem(e.dragData, this.vegetables);
}

onAnyDrop(e: DropEvent) {
  this.droppedItems.push(e.dragData);

  if (e.dragData.type === 'vegetable') {
    this.removeItem(e.dragData, this.vegetables);
  } else {
    this.removeItem(e.dragData, this.fruits);
  }
}

removeItem(item: any, list: Array<any>) {
  let index = list.map(function (e) {
    return e.name
  }).indexOf(item.name);
  list.splice(index, 1);
}
}