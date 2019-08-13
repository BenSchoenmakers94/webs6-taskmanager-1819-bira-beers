import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-detail',
  templateUrl: './data-detail.component.html',
  styleUrls: ['./data-detail.component.sass']
})
export class DataDetailComponent implements OnInit {

  @Input() selectedObject: any;

  constructor() { }

  ngOnInit() {
  }

}
