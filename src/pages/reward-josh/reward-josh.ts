import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-reward-josh',
  templateUrl: 'reward-josh.html',
})
export class RewardJoshPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RewardJoshPage');
  }

  goToRewardLateBedtime() {
    // Navigate to the RewardLateBedtimePage
    this.navCtrl.push('RewardLateBedtimePage');
  }
}
