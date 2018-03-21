import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-ready-pairing-off-device',
  templateUrl: 'ready-pairing-off-device.html',
})
export class ReadyPairingOffDevicePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
