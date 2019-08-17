import { Component, AfterViewChecked, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NiceTextService } from './services/nice-text.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewChecked  {

  public title: string;

  constructor(
    private route: Router,
    private textify: NiceTextService) {
  }

  ngAfterViewChecked() {
   setTimeout(() => {
    this.title = '';
    const parts = this.route.url.split('/');
    parts.reverse();
    parts.pop();
    parts.forEach(part => this.title += this.textify.getNiceText(part) + ' - ');
    this.title = this.title.substring(0, this.title.lastIndexOf(' -'));
   })
  }
}
