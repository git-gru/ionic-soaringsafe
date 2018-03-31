import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-set-initial-bedtime',
  templateUrl: 'set-initial-bedtime.html',
})
export class SetInitialBedtimePage {

  profileData = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.profileData = this.navParams.get('profileData');

    console.log('profile Data', this.profileData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetInitialBedtimePage');
  }

  goToSetInitialTimeLimits() {
    // Navigate to the SetInitialTimeLimitsPage
    this.navCtrl.push('SetInitialTimeLimitsPage');
  }
}
