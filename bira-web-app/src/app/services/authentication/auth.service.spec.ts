import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FireauthStub } from 'src/fixtures/fireauth-stub';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreStub } from 'src/fixtures/firestore-stub';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [ DashboardComponent ],
    schemas: [ NO_ERRORS_SCHEMA ],
    providers: [
      { provide: AngularFireAuth, useValue: FireauthStub },
      { provide: AngularFirestore, useValue: FirestoreStub }
    ],
    imports: [ RouterTestingModule.withRoutes([{path: 'dashboard', component: DashboardComponent}]), MatSnackBarModule ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
