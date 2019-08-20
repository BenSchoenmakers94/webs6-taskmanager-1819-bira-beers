import { TestBed, async, inject } from '@angular/core/testing';

import { AvailableAssetGuard } from './available-asset.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { FireauthStub } from 'src/fixtures/fireauth-stub';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreStub } from 'src/fixtures/firestore-stub';
import { MatSnackBarModule } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';

describe('AvailableAssetGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        AvailableAssetGuard,
        { provide: AngularFireAuth, useValue: FireauthStub },
        { provide: AngularFirestore, useValue: FirestoreStub }
      ],
      imports: [ RouterTestingModule.withRoutes([{path: 'dashboard', component: DashboardComponent}]), MatSnackBarModule ]
    });
  });

  it('should ...', inject([AvailableAssetGuard], (guard: AvailableAssetGuard) => {
    expect(guard).toBeTruthy();
  }));
});
