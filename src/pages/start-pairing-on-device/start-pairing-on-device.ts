import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { ProfileProvider } from '../../providers/profile/profile';


@IonicPage()
@Component({
  selector: 'page-start-pairing-on-device',
  templateUrl: 'start-pairing-on-device.html',
})
export class StartPairingOnDevicePage {

  deviceName(arg0: any, arg1: any): any {
    throw new Error("Method not implemented.");
  }
  profileId: any;
  profileData: any;
  urlPrefix = 'http://pair.soaringsafe.com/';
  buttonTxt = 'Start 1-click Pairing';
  pairColor = '#488aff';
  nextColor = '#8a8282';

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, 
    public inAppBrowser: InAppBrowser, public profileService: ProfileProvider) {

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
    console.log('ionViewDidLoad StartPairingOnDevicePage');
  }

  goToInstallationCheck() {
    // Navigate to the InstallationCheckPage
    this.navCtrl.setRoot('InstallationCheckPage');
  }
  startPairing() {
    this.profileService.getProfileNumber(this.profileId).subscribe(res=>{
      const profileNumber = JSON.parse(JSON.stringify(res)).profileNumber;
      
      if(profileNumber != 0) {
        const url = this.urlPrefix + profileNumber;
        console.log('Dynamic URL ', url);

        const options: InAppBrowserOptions = {
          zoom: 'no'
        }
        // Set the Target Browser
        const target = '_self';
        // const target = '_system';
        // const browser = this.inAppBrowser.create(url, target, options);
        this.buttonTxt = 'Retry 1-click pairing';
        this.pairColor = '#8a8282';
        this.nextColor = '#488aff';

        let status = 'Started Pairing On Device';
        this.profileService.updateDeviceStatus(this.profileId, status, this.deviceName);
      }
      console.log('Profile Number ', profileNumber);    
    });
  }
}
