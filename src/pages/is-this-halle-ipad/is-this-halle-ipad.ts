import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-is-this-halle-ipad',
  templateUrl: 'is-this-halle-ipad.html',
})
export class IsThisHalleIpadPage {

  deviceName: any;
  profileData: Promise<void>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    //get Device Name
    this.deviceName = this.navParams.get('deviceName');

    console.log('DeviceName Inside Is this Halle Ipad', this.deviceName);

   this.storage.get('profileData').then(res => {
      this.profileData = res;
    }).catch(error => {
      console.log('Error Occured while Fetching Profile Data', error);
    });

    console.log('profile Data', this.profileData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IsThisHalleIpadPage');
  }

  goToStartPairingOnDevice() {
    // Navigate to the StartPairingOnDevicePage
    this.navCtrl.push('StartPairingOnDevicePage');
  }

  goToReadyPairingOffDevice() {
    // Navigat to the ReadyPairingOffDevicePage
    this.navCtrl.push('ReadyPairingOffDevicePage');
  }
}
