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
  showProfileCompleteMessage: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage, public profileService: ProfileProvider, public userService: UserProvider) {

    //get ProfileId
      this.profileId = this.navParams.get('profileId');
      console.log('ProfileId inside the Start pairing', this.profileId);

    //set ProfileId in storage for next pages
    this.storage.set('profileId', this.profileId);

      
      //test previous page
      console.log('Previous page is (obj), name', this.navCtrl.last(), this.navCtrl.last().name);
      if (this.navCtrl.last().name === "SetInitialBedtimePage" || this.navCtrl.last().name === "SetInitialTimeLimitsPage") {
        this.showProfileCompleteMessage = true;
      }
      else {
        this.showProfileCompleteMessage = false;
      }

    this.profileData = this.storage.get('profileData').then(res => {
      this.profileData = res;
    }).catch(error => {
      console.log('Error Occured while Fetching Profile Data', error);
    });

    console.log('profile Data', this.profileData);
  }

  isGroupShown(group) {
    return this.showProfileCompleteMessage;
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
      console.log('successfully updated Devices');
      if(res) {
        // Navigate to the IsThisHalleIpadPage
        // this.navCtrl.push('IsThisHalleIpadPage', {deviceName: this.deviceName});
        this.navCtrl.push('IsThisHalleIpadPage');
      }
    }).catch(error => {
      console.log('Error inside Offtimes upload', error);
    });
  }
}
