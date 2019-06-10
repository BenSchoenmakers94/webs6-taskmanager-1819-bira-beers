import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { NiceTextService } from 'src/app/services/nice-text.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.sass']
})
export class WizardComponent implements OnInit {
  @Input() data: Observable<any>;
  @Input() title: string;
  @Input() extra: string;
  iteratableProperties: string[];
  step = 0;

  constructor(public textify: NiceTextService) { }

  ngOnInit() {
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  getKeys(object: any) {
    return Object.keys(object);
  }

  getNiceText(text: string) {
    return this.textify.getNiceText(text);
  }
}
