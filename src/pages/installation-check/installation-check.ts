import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-installation-check',
  templateUrl: 'installation-check.html',
})
export class InstallationCheckPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
