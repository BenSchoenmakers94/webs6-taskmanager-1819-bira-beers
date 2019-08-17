import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DatastoreService } from '../datastore/datastore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLogged: Observable<any>;

  public async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credentials = await this.afAuth.auth.signInWithPopup(provider);
    this.updateUserData(credentials.user);
    this.userLogged = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.router.navigateByUrl('/dashboard');
  }

  private updateUserData(user: any) {
    const existingUserRef = this.store.store.collection('users').doc(user.uid);
    existingUserRef.get().toPromise().then((docSnapShot) => {
      if (!docSnapShot.exists) {
        const userReference: AngularFirestoreDocument = this.afs.doc(`users/${user.uid}`);
        let name: string;
        name = user.displayName;
        const documentData = {
          uid: user.uid,
          firstName: name.split(' ')[0],
          lastName: name.substring(name.indexOf(' ') + 1),
          description: 'Enter your description here',
          teamId: '',
          name: user.displayName,
          email: user.email,
        };
        return userReference.set(documentData, { merge: true });
      }
    });
  }

  public async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private store: DatastoreService) {
                this.userLogged = this.afAuth.authState.pipe(
                  switchMap(user => {
                    if (user) {
                      return this.afs.doc(`users/${user.uid}`).valueChanges();
                    } else {
                      return of(null);
                    }
                  })
                );
                this.router.navigateByUrl('/dashboard');
              }
}


