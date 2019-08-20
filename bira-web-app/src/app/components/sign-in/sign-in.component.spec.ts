import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SignInComponent } from './sign-in.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { FireauthStub } from 'src/fixtures/fireauth-stub';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirestoreStub } from 'src/fixtures/firestore-stub';
import { MatSnackBarModule } from '@angular/material';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: AngularFireAuth, useValue: FireauthStub },
        { provide: AngularFirestore, useValue: FirestoreStub }
      ],
      imports: [ RouterTestingModule, MatSnackBarModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
