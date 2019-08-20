import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header.component';
import { MatMenuModule, MatSnackBarModule } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
import { FireauthStub } from 'src/fixtures/fireauth-stub';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreStub } from 'src/fixtures/firestore-stub';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { of } from 'rxjs';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';

const datastore = {
  getAllCollections: () => of([{ payload: {doc: {id: 'test'}}} ])
}
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent, DashboardComponent ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
         RouterTestingModule.withRoutes([{path: 'dashboard', component: DashboardComponent}]),
          MatMenuModule, MatSnackBarModule ],
      providers: [
        { provide: DatastoreService, useValue: datastore },
        { provide: AngularFireAuth, useValue: FireauthStub },
        { provide: AngularFirestore, useValue: FirestoreStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
