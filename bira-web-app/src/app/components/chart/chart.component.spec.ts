import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChartComponent } from './chart.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { MatSnackBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { FirestoreStub } from 'src/fixtures/firestore-stub';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartComponent, DashboardComponent ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub },
      ],
      imports: [MatSnackBarModule, RouterTestingModule.withRoutes([{path: ' dashboard', component: DashboardComponent}]), ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    fixture.componentInstance.workingObject = Observable.of({
      startDate: new Date('11-11-2019'),
      endDate: new Date('12-12-2019'),
      name: 'test sprint'
    })

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
