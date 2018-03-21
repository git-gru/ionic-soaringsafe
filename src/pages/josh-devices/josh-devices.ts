import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-josh-devices',
  templateUrl: 'josh-devices.html',
})
export class JoshDevicesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoshDevicesPage');
  }

  goToJoshIPhone6() {
    // Navigate to the JoshIPhone6Page
    this.navCtrl.push('JoshIPhone6Page');
  }

  goToIsThisHalleIPad() {
    // Navigate to the IsThisHalleIPadPage
    this.navCtrl.push('IsThisHalleIPadPage');
  }

  goToStartPairing() {
    // Navigate to the StartPairingPage
    this.navCtrl.push('StartPairingPage');
  }
}
