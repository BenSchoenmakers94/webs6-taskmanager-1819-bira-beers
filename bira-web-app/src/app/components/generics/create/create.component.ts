import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { Observable, Subject } from 'rxjs';
import { NiceTextService } from 'src/app/services/nice-text.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit, OnDestroy {

  @Input() objectId?: any;
  public Object = Object;
  public properties: Observable<any>;

  private saveableObject: any = {};
  private type: any;
  private unSubscribe = new Subject();

  constructor(
    private route: ActivatedRoute,
    private store: DatastoreService) { }

  ngOnInit() {
    this.route.parent.url.subscribe(url => {
      this.type = url[0].path;
      this.properties = this.store.getPropertiesOfType(this.type);
      this.properties.pipe(takeUntil(this.unSubscribe)).subscribe(props => {
        const objectNames = this.Object.getOwnPropertyNames(props);
        objectNames.forEach(prop => {
          if (!this.saveableObject[prop]) {
            this.saveableObject[prop] = '';
          }
        });
      });
    });
  }

  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  stateChangedHandler(propertyAndValue: any) {
    this.saveableObject[propertyAndValue.property] = propertyAndValue.value;
  }

  onSave() {
    this.store.upsertDocument(this.type, this.saveableObject, this.objectId);
  }
}
