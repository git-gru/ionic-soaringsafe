import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-reward-late-bedtime',
  templateUrl: 'reward-late-bedtime.html',
})
export class RewardLateBedtimePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RewardLateBedtimePage');
  }

  goToRewardJosh() {
    // Navigation to the RewardJoshPage
    this.navCtrl.push('RewardJoshPage');
  }
}
