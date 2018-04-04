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
  profileData: any;
  profileId: any;
  url = '';
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, 
    public profileService: ProfileProvider) {
    
     this.storage.get('profileId').then(res => {
      this.profileId = res;
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
    }).catch(error => {
      console.log('InstallationCheck: Error Occured while Fetching Device Name',error);
    });

    console.log('Device Name', this.deviceName);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPairingOffDevicePage');
  }

  goToInstallationCheck() {
    // Navigate to the InstallationCheckPage
    this.navCtrl.setRoot('InstallationCheckPage');
  }

  startPairing() {
    this.profileService.getProfileNumber(this.profileId).subscribe(res=>{
      const profileNumber = JSON.parse(JSON.stringify(res)).profileNumber;
      
      if(profileNumber != 0) {
        this.url = 'http://pair.soaringsafe.com/' + profileNumber; 
      }
      console.log('Profile Number ', profileNumber);    
    });
  }
}
