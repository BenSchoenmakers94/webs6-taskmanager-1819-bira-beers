import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.sass']
})
export class WizardComponent implements OnInit {
  @Input() data: Observable<any>;
  @Input() title: string;
  @Input() extra: string;

  constructor() { }

  ngOnInit() {
  }

}
