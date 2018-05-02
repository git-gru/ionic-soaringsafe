import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-ready-pairing-off-device',
  templateUrl: 'ready-pairing-off-device.html',
})
export class ReadyPairingOffDevicePage {

  profileData(arg0: any, arg1: any): any {
    throw new Error("Method not implemented.");
  }
  deviceName(arg0: any, arg1: any): any {
    throw new Error("Method not implemented.");
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

    this.storage.get('profileData').then(res => {
      this.profileData = res;
      console.log('profile Data inside ready-paring-off', this.profileData);
    }).catch(error => {
      console.log('Error Occured while Fetching Profile Data', error);
    });
    

    this.storage.get('deviceName').then(res=> {
      this.deviceName = res;
      console.log('Device Name inside ready-pairing-off', this.deviceName);
    }).catch(error => {
      console.log('InstallationCheck: Error Occured while Fetching Device Name',error);
    });

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReadyPairingOffDevicePage');
  }

  goToStartPairingOffDevice() {
    // Navigate to the StartPairingOffDevicePage
    this.navCtrl.push('StartPairingOffDevicePage');
  }

  goToPairLater() {
    // Navigate to the PairLaterPage
    this.navCtrl.push('PairLaterPage');
  }
}
