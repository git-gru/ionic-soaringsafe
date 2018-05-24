import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProfileProvider } from '../../providers/profile/profile';

@IonicPage()
@Component({
  selector: 'page-installation-check',
  templateUrl: 'installation-check.html',
})
export class InstallationCheckPage {

  profileId: any;
  deviceName: any;
  profileData: any;
  shownGroup = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
    public profileService: ProfileProvider) {

    this.storage.get('profileId').then(res => {
      this.profileId = res;
    }).catch(error => {
      console.log('Start-paring-on-device: Error Occured While fetching ProfileId from local Storage', error);
    });

    this.storage.get('profileData').then(res => {
      this.profileData = res;
    }).catch(error => {
      console.log('Error Occured while Fetching Profile Data', error);
    });
    
    console.log('profile Data', this.profileData);

    this.storage.get('deviceName').then(res=> {
      this.deviceName = res;
    }).catch(error => {
      console.log('InstallationCheck: Error Occured while Fetching Device Name',error);
    });

    console.log('Device Name', this.deviceName);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InstallationCheckPage');
  }

  goToInstallationSuccessful() {
    console.log('Inside Installation Success');
     let status = 'Pairing Successful';
               
    this.profileService.updateDeviceStatus(this.profileId, status, this.deviceName);

    // // Navigate to the InstallationSuccessfulPage
    this.navCtrl.setRoot('InstallationSuccessfulPage', {profileId: this.profileId});
  }

  goToInstallationTryAgain() {
    this.profileService.updateDeviceStatus(this.profileId, "Retry pairing", this.deviceName);
    // Navigate to the InstallationTryAgainPage
    this.navCtrl.push('InstallationTryAgainPage'); 
  }

  //For toogling showing more information
  toggleGroup(group) {  
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }
  isGroupShown(group) {
    return this.shownGroup === group;
  }
}
