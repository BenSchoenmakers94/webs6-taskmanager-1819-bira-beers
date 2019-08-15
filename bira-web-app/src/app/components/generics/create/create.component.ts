import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { NiceTextService } from 'src/app/services/nice-text.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit {

  @Input() objectId?: any;
  public Object = Object;
  public properties: Observable<any>;
  private saveableObject: any = {};
  private type: any;
  private nrOfProps: number;

  constructor(
    private route: ActivatedRoute,
    private store: DatastoreService,
    private snackbar: MatSnackBar,
    private textify: NiceTextService) { }

  ngOnInit() {
    this.route.parent.url.subscribe(url => {
      this.type = url[0].path;
      this.properties = this.store.getPropertiesOfType(this.type);
      this.properties.subscribe(props => {
        this.nrOfProps = this.Object.getOwnPropertyNames(props).length;
      });
    });
  }

  stateChangedHandler(propertyAndValue: any) {
    this.saveableObject[propertyAndValue.property] = propertyAndValue.value;
  }

  onSave() {
    if (this.nrOfProps === this.Object.getOwnPropertyNames(this.saveableObject).length) {
      this.store.upsertDocument(this.type, this.saveableObject, this.objectId);
      this.snackbar.open('You created a new ' + this.textify.getSingular(this.type) + '!', 'OK', {duration: 2000});
   } else {
      this.snackbar.open('Please fill out all properties!', 'OK', {duration: 2000});
    }
  }
}
