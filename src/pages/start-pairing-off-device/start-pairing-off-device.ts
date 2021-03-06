import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProfileProvider } from '../../providers/profile/profile';


@IonicPage()
@Component({
  selector: 'page-start-pairing-off-device',
  templateUrl: 'start-pairing-off-device.html',
})
export class StartPairingOffDevicePage {

  deviceName: any;
  deviceId: any;
  profileData: any;
  profileId: any;
  url = '';
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, 
    public profileService: ProfileProvider) {
    
     Promise.all([this.storage.get('profileId'), this.storage.get('deviceId')]).then(([resProf, resDev]) => {
      this.profileId = resProf;
      this.deviceId = resDev;
      this.startPairing();
    }).catch(error => {
      console.log('Start-paring-off-device: Error Occured While fetching ProfileId from local Storage', error);
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


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPairingOffDevicePage');
  }

  goToInstallationCheck() {
    // Navigate to the InstallationCheckPage
    this.navCtrl.setRoot('InstallationCheckPage');
  }

  startPairing() {
    //this.profileService.getProfileNumber(this.profileId).subscribe(res=>{
    this.profileService.getDeviceNumber(this.profileId, this.deviceId).subscribe(res=> {  
      const deviceNumber = JSON.parse(JSON.stringify(res)).deviceNumber;
      
      if(deviceNumber != 0) {
        this.url = 'pair.soaringsafe.com/' + deviceNumber; 
      }
      console.log('Profile Number ', deviceNumber);    
    });
  }
}
