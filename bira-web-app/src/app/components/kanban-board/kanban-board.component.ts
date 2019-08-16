import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';

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
  constructor(
    private store: DatastoreService) { }

  ngOnInit() {
    this.redraw();
  }

  redraw() {
    this.columnsList = [];
    return this.columnType.subscribe(x => {
      x.forEach(element => {
        if (!this.columnsList.includes(element.name)) {
          this.columnsList.push(element.name);
        }
      });
      //this.cdr.detectChanges();
    });
  }

}
