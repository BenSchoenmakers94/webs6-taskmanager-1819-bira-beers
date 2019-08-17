import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: DatastoreService,
    private snackbar: MatSnackBar,
    private textify: NiceTextService) { }

  ngOnInit() {
    this.route.parent.url.subscribe(url => {
      this.type = url[0].path;
      this.properties = this.store.getPropertiesOfType(this.type);
      this.properties.subscribe(props => {
        const objectNames = this.Object.getOwnPropertyNames(props);
        objectNames.forEach(prop => {
          if (!this.saveableObject[prop]) {
            this.saveableObject[prop] = '';
          }
        });
      });
    });
  }

  stateChangedHandler(propertyAndValue: any) {
    this.saveableObject[propertyAndValue.property] = propertyAndValue.value;
  }

  onSave() {
    this.store.upsertDocument(this.type, this.saveableObject, this.objectId);
    this.router.navigateByUrl(this.router.url.substring(0, this.router.url.lastIndexOf('/')));
    this.snackbar.open('You created a new ' + this.textify.getSingular(this.type) + '!', 'OK', { duration: 2000 });
  }
}
