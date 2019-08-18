import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EditComponent } from './edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreStub } from 'src/fixtures/firestore-stub';
import { MatSnackBarModule } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditComponent ],
      imports: [ RouterTestingModule, MatSnackBarModule ],
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub },
        { provide: ActivatedRoute, useValue: {
            snapshot: {
              parent: {
                routeConfig: { path: 'test'}
              },
              params: { id: 1 }
           }
        } }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
