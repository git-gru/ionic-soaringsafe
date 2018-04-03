import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-installation-check',
  templateUrl: 'installation-check.html',
})
export class InstallationCheckPage {

  deviceName: any;
  profileData(arg0: any, arg1: any): any {
    throw new Error("Method not implemented.");
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

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
    // Navigate to the InstallationSuccessfulPage
    this.navCtrl.setRoot('InstallationSuccessfulPage');
  }

  goToInstallationTryAgain() {
    // Navigate to the InstallationTryAgainPage
    this.navCtrl.setRoot('InstallationTryAgainPage');
  }

}
