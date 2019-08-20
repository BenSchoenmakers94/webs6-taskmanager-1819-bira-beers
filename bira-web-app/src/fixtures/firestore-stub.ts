import { BehaviorSubject } from 'rxjs';

export const FirestoreStub = {
    collection: (name: string) => ({
      snapshotChanges: () => new BehaviorSubject({ foo: 'bar' }),
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      doc: (_id: string) => ({
        valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
        set: (_d: any) => new Promise((resolve, _reject) => resolve()),
      }),
    })
  };