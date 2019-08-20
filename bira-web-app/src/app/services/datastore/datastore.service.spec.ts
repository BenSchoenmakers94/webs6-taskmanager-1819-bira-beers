import { TestBed } from '@angular/core/testing';

import { DatastoreService } from './datastore.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FireauthStub } from 'src/fixtures/fireauth-stub';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreStub } from 'src/fixtures/firestore-stub';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material';

describe('DatastoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: AngularFireAuth, useValue: FireauthStub },
      { provide: AngularFirestore, useValue: FirestoreStub }
    ],
    imports: [ RouterTestingModule, MatSnackBarModule ]
  }));

  it('should be created', () => {
    const service: DatastoreService = TestBed.get(DatastoreService);
    expect(service).toBeTruthy();
  });
});
