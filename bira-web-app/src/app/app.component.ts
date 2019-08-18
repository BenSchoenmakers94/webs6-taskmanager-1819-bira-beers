import { Component, AfterViewChecked, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NiceTextService } from './services/nice-text.service';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  public title: string;

  constructor(
    private router: Router,
    private textify: NiceTextService) {
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(object => {
        return object instanceof NavigationEnd;
      })
    ).subscribe((url: NavigationEnd) => {
      this.title = '';
      const parts = url.url.split('/');
      parts.reverse();
      parts.pop();
      parts.forEach(part => this.title += this.textify.getNiceText(part) + ' - ');
      this.title = this.title.substring(0, this.title.lastIndexOf(' -'));
    });
  }
}
