import { TestBed } from '@angular/core/testing';

import { NotifyService } from './notify.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FireauthStub } from 'src/fixtures/fireauth-stub';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreStub } from 'src/fixtures/firestore-stub';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NotifyService', () => {
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
    const service: NotifyService = TestBed.get(NotifyService);
    expect(service).toBeTruthy();
  });
});
