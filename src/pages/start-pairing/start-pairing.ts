import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProfileProvider } from '../../providers/profile/profile';
import { UserProvider } from '../../providers/user/user';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@IonicPage()
@Component({
  selector: 'page-start-pairing',
  templateUrl: 'start-pairing.html',
})
export class StartPairingPage {

  profileData: any;
  deviceName: string;
  profileId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage, public profileService: ProfileProvider, public userService: UserProvider) {

    //get ProfileId
      this.profileId = this.navParams.get('profileId');

      console.log('ProfileId inside the Start pairing', this.profileId);

    this.profileData = this.storage.get('profileData').then(res => {
      this.profileData = res;
    }).catch(error => {
      console.log('Error Occured while Fetching Profile Data', error);
    });

    console.log('profile Data', this.profileData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPairingPage');
  }

  goToIsThisHalleIPad() {
    let currentTime = this.userService.getUserTimestamp();
    let deviceInfo = {
      deviceName: this.deviceName,
      created: currentTime,
      deviceStatus: 'Pairing Initiated', 
      profileId: this.profileId
    }
    this.storage.set('deviceName', this.deviceName);
    this.profileService.storeDevice(deviceInfo, this.profileId).then(res => {
      console.log('successfully updated Offtimes');
      if(res) {
        // Navigate to the IsThisHalleIpadPage
        this.navCtrl.push('IsThisHalleIpadPage', {deviceName: this.deviceName});
      }
    }).catch(error => {
      console.log('Error inside Offtimes upload', error);
    });
  }
}
