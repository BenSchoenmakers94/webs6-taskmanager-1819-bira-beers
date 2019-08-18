import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { takeUntil, take } from 'rxjs/operators';
import { NiceTextService } from 'src/app/services/nice-text.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.sass']
})
export class KanbanBoardComponent implements OnInit, OnDestroy {

  @Input() columnType: Observable<any>;
  @Input() moveables: Observable<any>;
  @Input() workingObject: Observable<any>;
  @Input() columnProperty: any;
  @Input() moveableProperty: any;
  @Input() workableProperty: any;

  public Object = Object;
  public columnsList: any[];

  private unSubscribeColumn: Subject<any>;
  private unSubscribeMoveable: Subject<any>;
  private unSubscribeWorkable: Subject<any>;
  private workableId: any;

  constructor(
    private store: DatastoreService,
    private router: Router,
    private textify: NiceTextService) { }

  ngOnInit() {
    this.unSubscribeColumn = new Subject();
    this.unSubscribeMoveable = new Subject();
    this.unSubscribeWorkable = new Subject();
    this.redraw();
  }

  ngOnDestroy() {
    this.unSubscribeColumn.next();
    this.unSubscribeColumn.complete();

    this.unSubscribeMoveable.next();
    this.unSubscribeMoveable.complete();

    this.unSubscribeWorkable.next();
    this.unSubscribeWorkable.complete();
  }

  redraw() {
    this.columnsList = [];
    this.columnType.pipe(takeUntil(this.unSubscribeColumn)).subscribe(x => {
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
    this.moveables.pipe(takeUntil(this.unSubscribeMoveable)).subscribe(y => {
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
    this.workingObject.pipe(takeUntil(this.unSubscribeWorkable)).subscribe(workable => {
      this.workableId = workable[0].uid;
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
    const selector = parseInt(
      event.container.id.substring(event.container.id.lastIndexOf('-') + 1, event.container.id.length), 10) % this.columnsList.length;
    event.container.data.forEach(value => {
      const copy = JSON.parse(JSON.stringify(value));
      copy[this.columnProperty] = this.columnsList[selector].propertyName;
      copy[this.textify.getIdForType(this.workableProperty)] = this.workableId;
      this.store.upsertDocument(this.moveableProperty, copy, copy.uid, true);
    });
  }
}
