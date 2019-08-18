import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { NiceTextService } from 'src/app/services/nice-text.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.sass']
})
export class ChartComponent implements OnInit, OnDestroy {

  @Input() workingObject: Observable<any>;

  public collectionOfWorkable: Observable<any>;

  public lineChartData: ChartDataSets[];

  public lineChartLabels: Label[];

  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  private unSubscribeWorkable: Subject<any>;
  private unSubscribeCollection: Subject<any>;

  constructor(
    private store: DatastoreService,
    private textify: NiceTextService) { }

  ngOnInit() {
    this.unSubscribeWorkable = new Subject();
    this.unSubscribeCollection = new Subject();
    this.workingObject.pipe(takeUntil(this.unSubscribeWorkable)).subscribe(workable => {
      this.calculateChartData(workable[0]);
    });
  }

  ngOnDestroy() {
    this.unSubscribeWorkable.next();
    this.unSubscribeWorkable.complete();

    this.unSubscribeCollection.next();
    this.unSubscribeCollection.complete();
  }

  calculateChartData(workable: any) {
    const startDate = new Date(workable.startDate);
    const endDate = new Date(workable.endDate);
    const diff = this.DifferenceInDays(startDate, endDate);
    this.collectionOfWorkable = this.store.userStoriesForSprint(workable.uid);
    this.collectionOfWorkable.pipe(takeUntil(this.unSubscribeCollection)).subscribe(collection => {
      let amountOfPoints = 0;
      const userStories = [];
      collection.forEach(userStory => {
        amountOfPoints += parseInt(userStory.storyPoints, 10);
        if (userStory.stateId === 'Done') {
          userStories.push(userStory);
        }
      });
      this.lineChartData = [];
      this.lineChartData.push(this.getOptimal(diff, amountOfPoints));
      this.lineChartLabels = [];
      this.lineChartLabels = this.getLabels(startDate, diff);
      this.lineChartData.push(this.getCurrent(workable.name, userStories, amountOfPoints));
    });
  }

  getOptimal(daysDiff: any, totalPoints: any, currentExtension?: any) {
    let optimal = { data: [], label: 'Optimal' };
    if (currentExtension) { optimal = currentExtension; }
    const optimumPerDay = totalPoints / daysDiff;
    let counter = 0;
    for (let i = 0; i < daysDiff + 1; i++) {
      optimal.data.push(totalPoints - counter);
      counter += optimumPerDay;
    }
    return optimal;
  }

  getCurrent(labelName: any, collection: any[], totalPoints: any) {
    const current = { data: [], label: labelName };
    collection.sort((a, b) => {
      if (new Date(a._UpdatedAt) > new Date(b._UpdatedAt)) {
        return 1;
      } else if (new Date(a._UpdatedAt) < new Date(b._UpdatedAt)) {
        return -1;
      } else {
        return 0;
      }
    });

    let remainingPoints = totalPoints;
    this.lineChartLabels.forEach(label => {
      collection.forEach(object => {
        if (object._UpdatedAt === label) {
          remainingPoints -= object.storyPoints;
        }
      });
      const diff = this.lineChartLabels.length - current.data.length;
      if (diff === 0) {
        return this.getOptimal(diff, remainingPoints, current);
      }
      current.data.push(remainingPoints);
    });
    return current;
  }

  getLabels(startDate: any, dateDiff) {
    const labels = [];
    let dateIncrementer = startDate;
    for (let i = 0; i < dateDiff + 1; i++) {
      labels.push(dateIncrementer.toLocaleDateString('nl-NL', {
        day: 'numeric', month: 'short', year: 'numeric'
      }).replace(/ /g, '-').replace(/\./g, ''));
      dateIncrementer = new Date(dateIncrementer.getTime() + 1000 * 60 * 60 * 24);
    }
    return labels;
  }

  DifferenceInDays(firstDate, secondDate) {
    return Math.round((secondDate - firstDate) / (1000 * 60 * 60 * 24));
  }
}
