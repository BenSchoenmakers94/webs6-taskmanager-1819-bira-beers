import { TestBed, async, inject } from '@angular/core/testing';

import { IsAdminGuard } from './is-admin.guard';
import { AngularFireAuth } from '@angular/fire/auth';
import { FireauthStub } from 'src/fixtures/fireauth-stub';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreStub } from 'src/fixtures/firestore-stub';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material';

describe('IsAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IsAdminGuard,
        { provide: AngularFireAuth, useValue: FireauthStub },
        { provide: AngularFirestore, useValue: FirestoreStub }
      ],
      imports: [ RouterTestingModule, MatSnackBarModule ]

    });
  });

  it('should ...', inject([IsAdminGuard], (guard: IsAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
