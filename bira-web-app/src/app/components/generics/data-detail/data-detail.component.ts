import { Component, OnInit, Input, Output, EventEmitter, DoCheck, AfterContentInit } from '@angular/core';
import { NiceTextService } from 'src/app/services/nice-text.service';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-detail',
  templateUrl: './data-detail.component.html',
  styleUrls: ['./data-detail.component.sass']
})
export class DataDetailComponent implements OnInit, AfterContentInit {

  @Input() selectedObject?: any;
  @Input() displayedProperty: any;
  @Input() editable =  false;
  @Input() inputType?: any;
  @Output() stateChange?: EventEmitter<any> = new EventEmitter();

  public collection: Observable<any>;
  public selectedValue: any;
  public bindableDate: any;
  public minDate: any;

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

    if (this.inputType === 'boolean') {
      this.selectedValue = (this.selectedObject[this.displayedProperty] === true);
    }

    if (this.inputType === 'date') {
      this.bindableDate = new Date(this.selectedValue);
    }
    this.minDate = new Date();
  }

  ngAfterContentInit() {
    this.stateHasChanged(this.selectedValue);
  }

  onChange(value: any) {
    this.selectedValue = value;
    this.stateHasChanged(this.selectedValue);
  }

  onDateChange(value: any) {
    this.selectedValue = value.toLocaleDateString('nl-NL', {
      day: 'numeric', month: 'short', year: 'numeric'
    }).replace(/ /g, '-').replace(/\./g, '');
    this.bindableDate = value;
    this.stateHasChanged(this.selectedValue);
  }

  stateHasChanged(valueChanged: any) {
    const emittable = {
      property: this.displayedProperty,
      value: valueChanged
    };
    this.stateChange.emit(emittable);
  }
}
