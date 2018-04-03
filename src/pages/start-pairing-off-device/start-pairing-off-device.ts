import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-start-pairing-off-device',
  templateUrl: 'start-pairing-off-device.html',
})
export class StartPairingOffDevicePage {

  profileData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

    this.storage.get('profileData').then(res => {
      this.profileData = res;
    }).catch(error => {
      console.log('Error Occured while Fetching Profile Data', error);
    });

    console.log('profile Data', this.profileData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPairingOffDevicePage');
  }

  goToInstallationCheck() {
    // Navigate to the InstallationCheckPage
    this.navCtrl.setRoot('InstallationCheckPage');
  }
}
