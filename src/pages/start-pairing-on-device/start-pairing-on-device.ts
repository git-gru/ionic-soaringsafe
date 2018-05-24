import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
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
  deviceId: any;
  profileData: any;
  urlPrefix = 'http://pair.soaringsafe.com/';
  buttonTxt = 'Start 1-click Pairing';
  pairColor = '#488aff';
  nextColor = '#8a8282';

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, 
    public inAppBrowser: InAppBrowser, public profileService: ProfileProvider, public platform: Platform) {

    this.storage.get('profileId').then(res => {
      this.profileId = res;
    }).catch(error => {              
      console.log('Start-paring-on-device: Error Occured While fetching ProfileId from local Storage', error);
    });

    this.storage.get('deviceId').then(res => {
      this.deviceId = res;
    }).catch(error => {              
      console.log('Start-paring-on-device: Error Occured While fetching deviceId from local Storage', error);
    });

    this.storage.get('profileData').then(res => {
      this.profileData = res;
    }).catch(error => {
      console.log('Error Occured while Fetching Profile Data', error);
    });

    console.log('profile Data', this.profileData);

   this.storage.get('deviceName').then(res=> {
      this.deviceName = res;
      console.log('Device Name', this.deviceName);
      let status = 'Needs to complete pairing';
      this.profileService.updateDeviceStatus(this.profileId, status, this.deviceName);
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
      console.log("startPairing: gettingprofilenumber for profile", this.profileId)
    //this.profileService.getProfileNumber(this.profileId).subscribe(res=>{
      //We are now using DEVICE NUMBERS - not profileNumbers
      this.profileService.getDeviceNumber(this.profileId, this.deviceId).subscribe(res=> {
      const deviceNumber = JSON.parse(JSON.stringify(res)).deviceNumber;
      console.log('Device number', deviceNumber);

      if(deviceNumber != 0) {
        const url = this.urlPrefix + deviceNumber;
        console.log('Dynamic URL ', url);

        const options: InAppBrowserOptions = {
          zoom: 'no',
          // suppressesIncrementalRendering: 'yes'
        }

        this.platform.ready().then(() => {

          // Set the Target Browser
        // const target = '_self';
        // const target = '_blank';        
         const target = '_system';
         
          const browser = this.inAppBrowser.create(url, target);
                // const browser = this.inAppBrowser.create(url, target, "location = no");
         
         this.buttonTxt = 'Retry 1-click pairing';
         this.pairColor = '#8a8282';
         this.nextColor = '#488aff';
 
         
         browser.on('exit').subscribe(res => {
           console.log(res);
           console.log('browswer is closed');
           browser.close();
         }, error => {
           console.log('Error in InAppBrowser: ', error);
         });
 
         let status = 'Check Pairing';
         this.profileService.updateDeviceStatus(this.profileId, status, this.deviceName);

        }).catch(error => {
          console.log('Error While getting ready platform: ', error);
        });
        
      }
      console.log('Device Number ', deviceNumber);    
    });
  }
}
