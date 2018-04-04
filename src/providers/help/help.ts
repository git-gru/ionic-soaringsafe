import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable()
export class HelpProvider {

  constructor(public afs: AngularFirestore ) {
    console.log('Hello HelpProvider Provider');
  }

  getVideos() {
    // get and return list of Videos from database
    return this.afs.collection('HelpContent', ref => ref.where('Type', '==', 'Video')).valueChanges();
  }
  
  getFAQs() {
    // get and return list of FAQs from database
    return this.afs.collection('HelpContent', ref => ref.where('Type', '==', 'FAQ')).valueChanges();
  }
}
