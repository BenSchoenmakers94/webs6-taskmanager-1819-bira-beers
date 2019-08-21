import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NotifyService } from '../notification/notify.service';
import { NiceTextService } from '../nice-text.service';
import { take, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {
  public store: AngularFirestore;

  constructor(
    private afs: AngularFirestore,
    private notifier: NotifyService,
    private textify: NiceTextService,
    private router: Router) {
    this.store = this.afs;
  }

  sprintsForTeam(teamId) {
    return this.afs.collection('sprints', ref => ref.where('teamId', '==', teamId)).valueChanges();
  }

  userStoriesForSprint(sprintId) {
    return this.afs.collection('userStories', ref => ref.where('sprintId', '==', sprintId)).valueChanges();
  }

  findUser(userId) {
    return this.afs.collection('users').doc(userId).valueChanges();
  }

  getAllFromType(type: any) {
    return this.afs.collection(type).valueChanges();
  }

  getAllFromTypeSorted(type: any, property: any) {
    return this.afs.collection(type, ref => ref.orderBy(property)).valueChanges();
  }

  findObjectOfType(type: any, objectId: any) {
    return this.afs.collection(type).doc(objectId).valueChanges();
  }

  checkIfObjectExists(type: any, objectId: any) {
    return this.afs.collection(type).doc(objectId).get().toPromise();
  }

  getPropertiesOfType(type: string) {
    return this.findObjectOfType('properties', type);
  }

  getObjectFromId(objectId: string) {
    const type = objectId.substring(0, objectId.lastIndexOf('Id')) + 's';
    return this.afs.collection(type).doc(objectId).valueChanges();
  }

  updateDocument(type: any, objectId: any, data: any, noNavigation?: any) {
    this.afs.collection(type).doc(objectId).set(data, { merge: true });

    if (!noNavigation) { this.router.navigateByUrl(this.router.url.substring(0, this.router.url.lastIndexOf('/'))); }
    this.notifier.notifyUser(
      'Succesfully edited: ' +
      this.textify.getSingular(this.textify.getNiceText(type)) +
      ' (' + data.name + ') !');
  }

  upsertDocument(type: any, saveableObject: any, objectId?: any, noNavigation?: any) {
    if (objectId) {
      return this.validateObject(type, objectId, saveableObject, noNavigation);
    } else {
      const newId = this.afs.createId();
      const copy = JSON.parse(JSON.stringify(saveableObject));
      copy.uid = newId;
      return this.validateObject(type, newId, copy, noNavigation);
    }
  }

  getAllCollections(specifier: any) {
    return this.afs.collection(specifier).snapshotChanges();
  }

  findObjectOfTypeWithConstraints(type: string, constraintOnProperty: string, operator: any, desiredValue: any, amountOfResults: any) {
    return amountOfResults > 1 ?
      this.afs.collection(type, ref => ref.where(constraintOnProperty, operator, desiredValue).limit(amountOfResults)).valueChanges() :
      this.afs.collection(type, ref => ref.where(constraintOnProperty, operator, desiredValue)).valueChanges();
  }

  validateObject(type: any, objectId, objectData: any, noNavigation?: any) {
    const constraintsObservable = this.getAllCollections('constraints');
    constraintsObservable.pipe(
      take(1),
      map(values => {
        const returnable = [];
        values.forEach(value => {
          const data = value.payload.doc.data();
          const id = value.payload.doc.id;
          returnable.push({ id, data: { ...data } });
        });
        return returnable;
      })).subscribe(constraintsCollection => {
        const constraints = [];
        constraintsCollection.forEach(constraintType => {
          const typeIndexes = Object.getOwnPropertyNames(constraintType.data);
          typeIndexes.forEach(index => {
            if (type === constraintType.id) {
              constraints.push(this._getConstraint(constraintType.data[index]));
            }
          });
        });
        let canAdd = true;
        constraints.forEach(constraint => {
          if (constraint.operator === '>(date)') {
            const startDate = new Date(objectData[constraint.matchable]);
            const endDate = new Date(objectData[constraint.matcher]);
            if (!(startDate.getTime() > endDate.getTime())) {
              this.notifier.notifyUser(
                this.textify.getNiceText(
                  constraint.matchable) + ' needs to happen after: ' + this.textify.getNiceText(constraint.matcher));
              canAdd = false;
            }
          }
          if (constraint.operator === 'is') {
            if (objectData[constraint.matchable]) {
              this._setUnique(type, constraint.matchable, objectId, objectData[constraint.matchable], false);
              objectData['_UpdatedAt'] = new Date();
            }
          }
          if (constraint.operator === 'has') {
            objectData[constraint.matcher] = new Date().toLocaleDateString('nl-NL', {
              day: 'numeric', month: 'short', year: 'numeric'
            }).replace(/ /g, '-').replace(/\./g, '');
          }
          if (constraint.operator === 'new') {
            if (!objectData[constraint.matchable]) {
              if (constraint.matcher === 'false') {
                objectData[constraint.matchable] = false;
              } else if (constraint.matcher === 'true') {
                objectData[constraint.matchable] = true;
              } else {
                objectData[constraint.matchable] = constraint.matcher;
              }
            } else {
              if (objectData[constraint.matchable] === 'false' || objectData[constraint.matchable] === '') {
                objectData[constraint.matchable] = false;

              } else if (objectData[constraint.matchable] === 'true') {
                objectData[constraint.matchable] = true;
              }
            }
          }
          if (constraint.operator === 'on') {
            if (objectData['stateId'] === constraint.matcher) {
              if (objectData[constraint.matchable]) {
                objectData[constraint.matchable] = '';
              }
            }
            if (objectData['roleId'] === constraint.matcher) {
              if (objectData[constraint.matchable]) {
                objectData[constraint.matchable] = '';
              }
            }
          }
          if (constraint.operator === 'reset') {
            if (objectData[constraint.matchable] === false) {
              objectData['stateId'] = 'Backlog';
            } else {
              objectData['userId'] = '';
              objectData['sprintId'] = '';
              objectData['stateId'] = '';
            }
          }
        });
        if (canAdd) { this.updateDocument(type, objectId, objectData, noNavigation); }
      });
  }

  _getConstraint(constraintValue: any) {
    const parts = constraintValue.split(' ');
    return { matchable: parts[0], operator: parts[1], matcher: parts[2] };
  }

  _setUnique(type: any, distinctProperty: any, idToOmit, valueToRevert, revertTo: any) {
    this.getAllFromType(type).pipe(take(3)).subscribe(sprints => {
      sprints.forEach(sprint => {
        if (sprint['uid'] !== idToOmit) {
          if (sprint[distinctProperty] === valueToRevert) {
            sprint[distinctProperty] = revertTo;
            this.updateDocument(type, sprint['uid'], sprint, true);
          }
        }
      });
    });
  }
}
