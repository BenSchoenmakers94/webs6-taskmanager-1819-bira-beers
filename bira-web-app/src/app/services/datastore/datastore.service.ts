import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {
  store: AngularFirestore;
  constructor(private afs: AngularFirestore) {
      this.store = afs;
   }

  sprintsForTeam(teamId) {
    // return this.afs.collection('sprints').valueChanges();
    return this.afs.collection('sprints', ref => ref.where('teamId', '==', teamId)).valueChanges();
  }

  userStoriesForSprint(sprintId) {
    return this.afs.collection('userStories', ref => ref.where('sprintId', '==', sprintId)).valueChanges();
  }

  findUser(userId) {
    return this.afs.collection('users').doc(userId).valueChanges();
  }
}
