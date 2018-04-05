import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class FiltersProvider {
  
  constructor(public afs: AngularFirestore) {
    console.log('Hello FiltersProvider Provider');
  }
   //Get Default App Filters from Firestore Database 
  getAppFilters() { 
    return this.afs.collection('AppFilters').valueChanges();
  }

  //Get Profile App Filter from firestore Database

  getProfileAppFilters(profileId) {
    return this.afs.collection('profileSettings').doc(profileId).collection('appFilters').valueChanges();
  }

  getProfileCategoryFilters(profileId) {
    return this.afs.collection('profileSettings').doc(profileId).collection('categoryFilters').valueChanges();
  }
  async getProfileCutomFilters(profileId) {
    return await this.afs.collection('profileSettings').doc(profileId).collection('customFilters').valueChanges();
  }

  async getProfileSafetySecurityFilters(profileId) {
    return await this.afs.collection('profileSettings').doc(profileId).collection('safetySecurityFilters').valueChanges()
  }

  getCategoryFilters() {
    //Get Category Filters from Firestore Database 
    return this.afs.collection('CategoryFilters').valueChanges();
  }
  getDefaultFilters(ageGroup) {
    // this.afs.collection('DefaultFilterSettings').doc
  }
}
