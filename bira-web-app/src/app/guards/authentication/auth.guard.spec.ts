import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { FireauthStub } from 'src/fixtures/fireauth-stub';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { FirestoreStub } from 'src/fixtures/firestore-stub';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBarModule } from '@angular/material';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        AuthGuard,
        { provide: AngularFireAuth, useValue: FireauthStub },
        { provide: AngularFirestore, useValue: FirestoreStub }
      ],
      imports: [ RouterTestingModule.withRoutes([{path: 'dashboard', component: DashboardComponent}]), MatSnackBarModule ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
