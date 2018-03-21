import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-josh',
  templateUrl: 'josh.html',
})
export class JoshPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoshPage');
  }

  goToRewardJosh() {
    // Navigate to the RewardJoshPage
    this.navCtrl.push('RewardJoshPage');
  }

  goToJoshDevices() {
    // Navigate to the JoshDevicesPage
    this.navCtrl.push('JoshDevicesPage');
  }

  goToJoshReports() {
    // Navigate to the JoshReportsPage
    this.navCtrl.push('JoshReportsPage');
  }

  goToJoshFilters() {
    // Navigate to the JoshFiltersPage
    this.navCtrl.push('JoshFiltersPage');
  }

  goToJoshBedtime() {
    // Navigate to the JoshBedtimePage
    this.navCtrl.push('JoshBedtimePage');
  }

  goToJoshOfftime() {
    // Navigate to the JoshOfftimePage
    this.navCtrl.push('JoshOfftimePage');
  }

  goToJoshTimeLimits() {
    // Navigate to the JoshTimeLimitsPage
    this.navCtrl.push('JoshTimeLimitsPage');
  }

  goToStartPairing() {
    // Navigate to the StartPairingPage
    this.navCtrl.push('StartPairingPage');
  }
}
