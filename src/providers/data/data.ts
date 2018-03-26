import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable()
export class DataProvider {

  constructor(public afs: AngularFirestore ) {
    console.log('Hello DataProvider Provider');
  }
  getAvatars() {
    // get and return list of Avatar from database
    return this.afs.collection('Avatars').valueChanges();
  }
}
