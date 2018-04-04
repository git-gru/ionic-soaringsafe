import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';



@Injectable()
export class DataProvider {

  constructor(public afs: AngularFirestore, public aAuth: AngularFireAuth ) {
    console.log('Hello DataProvider Provider');
  }
  getAvatars() {
    // get and return list of Avatar from database
    return this.afs.collection('Avatars').valueChanges();
  }
  async getProfiles() {
    try {
      return await this.afs.collection('Profiles').doc(this.aAuth.auth.currentUser.uid).collection('my-profiles').valueChanges();
    } catch(error) {
      console.log('DataProvider: Errors', error);
    }
  }
  async getDevices(profileId) {
   return await this.afs.collection('profileSettings').doc(profileId).collection('devices').valueChanges();
  }
}
