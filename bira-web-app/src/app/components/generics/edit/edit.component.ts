import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { NiceTextService } from 'src/app/services/nice-text.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

  public Object = Object;
  public selectedObject: Observable<any>;
  public properties: Observable<any>;
  private saveableObject: any = {};
  private type: any;
  private id: any;

  constructor(
    private route: ActivatedRoute,
    private store: DatastoreService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.type = this.route.snapshot.parent.routeConfig.path;
    this.properties = this.store.getPropertiesOfType(this.type);
    this.selectedObject = this.store.findObjectOfType(this.type, this.id);
  }

  stateChangedHandler(propertyAndValue: any) {
    this.saveableObject[propertyAndValue.property] = propertyAndValue.value;
  }

  onSave() {
    this.store.upsertDocument(this.type, this.saveableObject, this.id);
  }
}
