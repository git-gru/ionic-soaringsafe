import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-installation-try-again',
  templateUrl: 'installation-try-again.html',
})
export class InstallationTryAgainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InstallationTryAgainPage');
  }

  goToIsThisHalleIPad() {
    // Navigate to the IsThisHalleIPadPage
    this.navCtrl.push('IsThisHalleIpadPage');
  }

  goToHelpAndSupport() {
    // Navigate to the HelpAndSupportPage
    this.navCtrl.push('HelpAndSupportPage');
  }
}
