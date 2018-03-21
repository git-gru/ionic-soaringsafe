import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-set-initial-bedtime',
  templateUrl: 'set-initial-bedtime.html',
})
export class SetInitialBedtimePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetInitialBedtimePage');
  }

  goToSetInitialTimeLimits() {
    // Navigate to the SetInitialTimeLimitsPage
    this.navCtrl.push('SetInitialTimeLimitsPage');
  }
}
