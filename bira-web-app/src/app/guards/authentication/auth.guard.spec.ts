import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { FireauthStub } from 'src/fixtures/fireauth-stub';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { FirestoreStub } from 'src/fixtures/firestore-stub';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBarModule } from '@angular/material';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AngularFireAuth, useValue: FireauthStub },
        { provide: AngularFirestore, useValue: FirestoreStub }
      ],
      imports: [ RouterTestingModule, MatSnackBarModule ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
