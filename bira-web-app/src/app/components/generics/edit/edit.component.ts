import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

  @Input() objectId?: any;
  public Object = Object;
  public properties: Observable<any>;
  private saveableObject: any = {};
  private type: any;

  constructor(
    private route: ActivatedRoute,
    private store: DatastoreService,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
    //type/1
    this.route.parent.url.subscribe(url => {
      this.type = url[0].path;
      this.properties = this.store.getPropertiesOfType(this.type);
    });
  }

  stateChangedHandler(propertyAndValue: any) {
    this.saveableObject[propertyAndValue.property] = propertyAndValue.value;
  }

  onSave() {
    this.store.upsertDocument(this.type, this.saveableObject, this.objectId);
  }
}