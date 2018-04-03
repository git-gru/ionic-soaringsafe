import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';

@Injectable()
export class ProfileProvider {

  profileData = {};
  profileFilter = {};
  appFilter = [];
  categoryFilter = [];
  customFilter = [];
  safetySecurity = [];
  safeSearch: string = '';
  youtubeRestricted: string = '';

  constructor(public afs: AngularFirestore, public storage: Storage, public aAuth: AngularFireAuth) {
    console.log('Hello ProfileProvider Provider');
  }

  createProfile(offtimes) {
    // Get Profile Data from Local Storage
    this.storage.get('profileData').then(res => {
      this.profileData = res;
    }).catch(error => {
      console.log('Error Occured while Fetching Profile Data', error);
    });

    // Get Profile Filter From local Storage
    this.storage.get('profileFilter').then((res: any) => {
      this.appFilter = JSON.parse(JSON.stringify(res)).appFilters;
      this.categoryFilter = JSON.parse(JSON.stringify(res)).categoryFilters;
      this.customFilter = JSON.parse(JSON.stringify(res)).customFilters;
      this.safeSearch = JSON.parse(JSON.stringify(res)).safeSearch;
      this.youtubeRestricted = JSON.parse(JSON.stringify(res)).youtubeRestricted;

      this.safetySecurity.push({name: 'safeSearch', status: this.safeSearch });
      this.safetySecurity.push({name: 'youtubeRestricted', status: this.youtubeRestricted });
      
      //print the Filters

      console.log('App Filter Inside the Profile Provider', this.appFilter);
      console.log('Category Filter Inside the Profile Provider', this.categoryFilter);
      console.log('Custom Filter Inside the Profile Provider', this.customFilter);
      console.log('Safety and Security Filter Inside the Profile Provider', this.safetySecurity);

    }).catch(error => {
      console.log('Error Occured while Fetching Profile fitler', error);
    });

    setTimeout(() => {
      console.log('Profile Data in Profle Provider: ', this.profileData)
      console.log('Offtimes Data: ', offtimes);

      this.profileData["userId"] = this.aAuth.auth.currentUser.uid;
      this.afs.collection('Profiles').doc(this.aAuth.auth.currentUser.uid).collection('my-profiles').add(this.profileData).then(res => {
                
        this.appFilter.forEach(appF => {
          appF["profileId"] = res.id;
          let dbRef = this.afs.collection('profileSettings').doc(res.id).collection('appFilters').add(appF).then(ar => {
            console.log('successfully updated app Filter');
          }).catch(error => {
            console.log('Error inside App Filter upload', error);
          });
        });

        //Store category Filters in Firestore Database

        this.categoryFilter.forEach(catF => {
          catF["profileId"] = res.id;
          let dbRef = this.afs.collection('profileSettings').doc(res.id).collection('categoryFilters').add(catF).then(ar => {
            console.log('successfully updated Category Filter');
          }).catch(error => {
            console.log('Error inside Category Filter upload', error);
          });
        });

        //Store Custome Filters in Firestore Database
        if(this.customFilter != undefined && this.customFilter != null ) {
          this.customFilter.forEach(custF => {
            custF["profileId"] = res.id;
            let dbRef = this.afs.collection('profileSettings').doc(res.id).collection('customFilters').add(custF).then(ar => {
              console.log('successfully updated Custom Filter');
            }).catch(error => {
              console.log('Error inside Custom Filter upload', error);
            });
          });
        }

        // Store Safety and Security in Firestore Database

        this.safetySecurity.forEach(ssF => {
          ssF["profileId"] = res.id;
          let dbRef = this.afs.collection('profileSettings').doc(res.id).collection('safetySecurityFilters').add(ssF).then(ar => {
            console.log('successfully updated Safety and Security Filter');
          }).catch(error => {
            console.log('Error inside Safety and Security Filter upload', error);
          });
        });

        // Store Offtimes in the Firestore Database

        if(offtimes != undefined && offtimes != null) {
          offtimes.forEach(off => {
            off["profileId"] = res.id;
            let dbRef = this.afs.collection('profileSettings').doc(res.id).collection('offtimes').add(off).then(ar => {
              console.log('successfully updated Offtimes');
            }).catch(error => {
              console.log('Error inside Offtimes upload', error);
            });
          });
        }

        // this.afs.collection('Profiles').doc(this.aAuth.auth.currentUser.uid).collection('customFilters').doc('')
        console.log('Successfully Updated', res.id);
      }).catch(error => {
        console.log('Error while updating Profile ', error);
      });
    }, 300);
  }
}
