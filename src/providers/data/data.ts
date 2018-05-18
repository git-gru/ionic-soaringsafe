import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';



@Injectable()
export class DataProvider {

  constructor(public afs: AngularFirestore, public aAuth: AngularFireAuth, public alertCtrl: AlertController) {
    console.log('Hello DataProvider Provider');
  }
  getAvatars() {
    // get and return list of Avatar from database
    return this.afs.collection('Avatars').valueChanges();
  }
  async getProfiles() {
    try {
      return await this.afs.collection('Profiles').doc(this.aAuth.auth.currentUser.uid).collection('my-profiles').valueChanges();
    } catch (error) {
      console.log('DataProvider: Errors', error);
    }
  }
  async getDevices(profileId) {
    return await this.afs.collection('profileSettings').doc(profileId).collection('devices').valueChanges();
  }

  getBedtimes(profileId) {
    return this.afs.collection('profileSettings').doc(profileId).collection('offtimes').valueChanges();
  }

  //Get Current User Information

  getCurrentUserData() {
    return this.afs.collection('user').doc(this.aAuth.auth.currentUser.uid).valueChanges();
  }

  //Create Alert controller

  showAlert(title, msg) {
    this.alertCtrl.create({
      title: title,
      message: msg,
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            console.log('clicked Ok');
          }
        }
      ]
    }).present();
  }

  // Days Data for Add Offtime
  daysData() {
   const days = [
      {
        dayName: 'Su',
        isSelected: false,
        buttonColor: '#f4f4f4'
      },
      {
        dayName: 'M',
        isSelected: false,
        buttonColor: '#f4f4f4'
      },
      {
        dayName: 'T',
        isSelected: false,
        buttonColor: '#f4f4f4'
      },
      {
        dayName: 'W',
        isSelected: false,
        buttonColor: '#f4f4f4'
      },
      {
        dayName: 'Th',
        isSelected: false,
        buttonColor: '#f4f4f4'
      },
      {
        dayName: 'F',
        isSelected: false,
        buttonColor: '#f4f4f4'
      },
      {
        dayName: 'Sa',
        isSelected: false,
        buttonColor: '#f4f4f4'
      }
      ];

      return days;
  }
}
