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

  profileUid: string;

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

      this.safetySecurity.push({ name: 'safeSearch', status: this.safeSearch });
      this.safetySecurity.push({ name: 'youtubeRestricted', status: this.youtubeRestricted });

      //print the Filters

      console.log('App Filter Inside the Profile Provider', this.appFilter);
      console.log('Category Filter Inside the Profile Provider', this.categoryFilter);
      console.log('Custom Filter Inside the Profile Provider', this.customFilter);
      console.log('Safety and Security Filter Inside the Profile Provider', this.safetySecurity);

    }).catch(error => {
      console.log('Error Occured while Fetching Profile fitler', error);
    });
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Profile Data in Profle Provider: ', this.profileData)
        console.log('Offtimes Data: ', offtimes);

        // this.profileData["userId"] = this.aAuth.auth.currentUser.uid;
        this.profileData["profileNumber"] = 0;

        this.afs.collection('Profiles').doc(this.aAuth.auth.currentUser.uid).collection('my-profiles').add(this.profileData).then(res => {
          this.profileUid = res.id;
          this.afs.collection('Profiles').doc(this.aAuth.auth.currentUser.uid).collection('my-profiles').doc(res.id).update({
            profileId: res.id
          }).catch(error=>{
            console.log("Errors while Updating the profile", error);
          });
          this.appFilter.forEach(appF => {
            appF["profileId"] = res.id;
            this.afs.collection('profileSettings').doc(res.id).collection('appFilters').add(appF).then(ar => {
              console.log('successfully updated app Filter');
            }).catch(error => {
              console.log('Error inside App Filter upload', error);
            });
          });

          //Store category Filters in Firestore Database

          this.categoryFilter.forEach(catF => {
            catF["profileId"] = res.id;
            this.afs.collection('profileSettings').doc(res.id).collection('categoryFilters').add(catF).then(ar => {
              console.log('successfully updated Category Filter');
            }).catch(error => {
              console.log('Error inside Category Filter upload', error);
            });
          });

          //Store Custome Filters in Firestore Database
          if (this.customFilter != undefined && this.customFilter != null) {
            this.customFilter.forEach(custF => {
              custF["profileId"] = res.id;
              this.afs.collection('profileSettings').doc(res.id).collection('customFilters').add(custF).then(ar => {
                console.log('successfully updated Custom Filter');
              }).catch(error => {
                console.log('Error inside Custom Filter upload', error);
              });
            });
          }

          // Store Safety and Security in Firestore Database

          this.safetySecurity.forEach(ssF => {
            ssF["profileId"] = res.id;
            this.afs.collection('profileSettings').doc(res.id).collection('safetySecurityFilters').add(ssF).then(ar => {
              console.log('successfully updated Safety and Security Filter');
            }).catch(error => {
              console.log('Error inside Safety and Security Filter upload', error);
            });
          });

          // Store Offtimes in the Firestore Database

          if (offtimes != undefined && offtimes != null) {
            offtimes.forEach(off => {
              off["profileId"] = res.id;
              this.afs.collection('profileSettings').doc(res.id).collection('offtimes').add(off).then(ar => {
                console.log('successfully updated Offtimes');
              }).catch(error => {
                console.log('Error inside Offtimes upload', error);
              });
            });
          }
          console.log('Successfully Updated', res.id);
          resolve({ profileId: res.id });
        }).catch(error => {
          console.log('Error while updating Profile ', error);
          reject(error);
        });
      }, 300);
    });
    return promise;
  }
  storeDevice(deviceInfo, profileId) {
    console.log('Device Name inside Profile Provider: ', deviceInfo);
    console.log('Profile Id inside Profile Provider', profileId);

    //update the Device Info in Profile Settings Collection of Firestore
    return this.afs.collection('profileSettings').doc(profileId).collection('devices').add(deviceInfo);
  }
  getProfileNumber(profileId) {
    return this.afs.collection('Profiles').doc(this.aAuth.auth.currentUser.uid).collection('my-profiles').doc(profileId).valueChanges();
  }
  updateDeviceStatus(profileId, status, deviceName) {
    console.log('deviceName Inside update Device Status', deviceName);
    this.afs.collection('profileSettings').doc(profileId).collection('devices').ref.where('deviceName', '==', deviceName)
      .get().then(snap => {
        snap.forEach(result => {
          console.log('Document Id with Device Name', result.id);
          this.afs.collection('profileSettings').doc(profileId).collection('devices').doc(result.id).update({
            deviceStatus: status
          }).then(res => {
            console.log('Device Status Updated Successfully');
          }).catch(error => {
            console.log('Error while updating device status', error);
          });
        });
      });
  }


  //Update Device Name

  updateDeviceName(newDeviceName, profileId, deviceName) {
    const promise = new Promise((resolve, reject) => {
      this.afs.collection('profileSettings').doc(profileId).collection('devices').ref.where('deviceName', '==', deviceName)
      .get().then(snap => {
        snap.forEach(result => {
          console.log('Document Id with Device Name', result.id);
          this.afs.collection('profileSettings').doc(profileId).collection('devices').doc(result.id).update({
            deviceName: newDeviceName
          }).then(res => {
            console.log('Device Status Updated Successfully');
            resolve(true);
          }).catch(error => {
            console.log('Error while updating device status', error);
            reject(error);
          });
        });
      }).catch(error => {
        console.log('Error while querying the database according to deviceName', error);
        reject(error);
      });
    });
    return promise;
  }
}
