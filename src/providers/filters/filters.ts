import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class FiltersProvider {
  
  constructor(public afs: AngularFirestore) {
    console.log('Hello FiltersProvider Provider');
  }
  getAppFilters() { 
    //Get App Filters from Firestore Database 
    return this.afs.collection('AppFilters').valueChanges();
  }
  getCategoryFilters() {
    //Get Category Filters from Firestore Database 
    return this.afs.collection('CategoryFilters').valueChanges();
  }
  getDefaultFilters(ageGroup) {
    // this.afs.collection('DefaultFilterSettings').doc
  }
}
