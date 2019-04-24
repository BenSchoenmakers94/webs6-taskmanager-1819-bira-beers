import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { User } from '../../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, timestamp } from 'rxjs/operators';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLogged: Observable<User>;

  public async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credentials = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credentials.user);
  }

  private updateUserData(user: any) {
    const userReference: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const documentData = {
      uid: user.uid,
      firstName: 'Your first name please?',
      lastName: 'Your last name please?',
      description: 'Enter your description here',
      teams: new Array(),
      birthDate: new Date(),
      userName: user.displayName,
      email: user.email,
    };
    return userReference.set(documentData, { merge: true });
  }

  public async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
                this.userLogged = this.afAuth.authState.pipe(
                  switchMap(user => {
                    if (user) {
                      return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                    } else {
                      return of(null);
                    }
                  })
                );
              }
}


