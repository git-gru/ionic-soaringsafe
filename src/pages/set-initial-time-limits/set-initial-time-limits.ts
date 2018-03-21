import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-set-initial-time-limits',
  templateUrl: 'set-initial-time-limits.html',
})
export class SetInitialTimeLimitsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetInitialTimeLimitsPage');
  }

  goToStartPairing() {
    // Navigate to the StartPairingPage
    this.navCtrl.push('StartPairingPage');
  }
}
