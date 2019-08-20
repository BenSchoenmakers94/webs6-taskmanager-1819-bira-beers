import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.sass']
})
export class WrapperComponent {

  @Input() workingObject: Observable<any>;

  public activeSprint: Observable<any>;

  constructor() { }

  // ngOnInit() {
  //   this.workingObject.pipe(map(objects => {
  //     let index = 0;
  //     let mostRecent = 0;
  //     objects.forEach(object => {
  //       if (object.active) {
  //         let now = object._UpdatedAt.toDate().getTime();
  //         if ((now - mostRecent) > 0) {
  //           mostRecent = now;
  //           index = object;
  //         }
  //       }
  //       return index;
  //     });
  //   }));
  //}
}
