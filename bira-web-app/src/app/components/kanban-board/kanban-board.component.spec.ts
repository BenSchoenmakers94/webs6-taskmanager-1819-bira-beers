import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { KanbanBoardComponent } from './kanban-board.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { FireauthStub } from 'src/fixtures/fireauth-stub';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreStub } from 'src/fixtures/firestore-stub';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material';
import { Observable, of } from 'rxjs';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';

const datastore = {
  getAllFromTypeSorted: () => of(['users']),
  getAllFromType: () => of(['users'])
}

describe('KanbanBoardComponent', () => {
  let component: KanbanBoardComponent;
  let fixture: ComponentFixture<KanbanBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KanbanBoardComponent, DashboardComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: DatastoreService, useValue: datastore },
        { provide: AngularFireAuth, useValue: FireauthStub },
        { provide: AngularFirestore, useValue: FirestoreStub }
      ],
      imports: [
          RouterTestingModule.withRoutes([{path: 'dashboard', component: DashboardComponent}]),
          MatSnackBarModule
         ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanBoardComponent);
    component = fixture.componentInstance;
    component.columnProperty = 'userId';
    component.workingObject = Observable.of(['test']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
