import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-start-pairing',
  templateUrl: 'start-pairing.html',
})
export class StartPairingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPairingPage');
  }

  goToIsThisHalleIPad() {
    // Navigate to the IsThisHalleIpadPage
    this.navCtrl.push('IsThisHalleIpadPage');
  }
}
