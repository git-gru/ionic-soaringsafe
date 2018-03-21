import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-is-this-halle-ipad',
  templateUrl: 'is-this-halle-ipad.html',
})
export class IsThisHalleIpadPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
