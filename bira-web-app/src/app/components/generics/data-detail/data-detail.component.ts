import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { NiceTextService } from 'src/app/services/nice-text.service';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-detail',
  templateUrl: './data-detail.component.html',
  styleUrls: ['./data-detail.component.sass']
})
export class DataDetailComponent implements OnInit, DoCheck {

  @Input() selectedObject?: any;
  @Input() displayedProperty: any;
  @Input() editable =  false;
  @Input() inputType?: any;
  @Output() stateChange?: EventEmitter<any> = new EventEmitter();

  public collection: Observable<any>;
  public selectedValue: any;
  private previousSelectedValue: any;

  constructor(
    public textify: NiceTextService,
    public store: DatastoreService) { }

  ngOnInit() {
    if (this.selectedObject) {
      this.selectedValue = this.selectedObject[this.displayedProperty];
    }
    if (this.inputType === 'one') {
      this.collection = this.store.getAllFromType(this.textify.getTypeForId(this.displayedProperty));
    }
  }

  ngDoCheck() {
    if (this.selectedValue && this.previousSelectedValue !== this.selectedValue) {
      this.previousSelectedValue = this.selectedValue;
      this.stateHasChanged(this.selectedValue);
    }
  }

  onChange(event: any) {
    this.selectedValue = event.value;
  }

  stateHasChanged(valueChanged: any) {
    const emittable = {
      property: this.displayedProperty,
      value: valueChanged
    };
    this.stateChange.emit(emittable);
  }
}
