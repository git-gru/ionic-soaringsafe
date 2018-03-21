import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-pair-later',
  templateUrl: 'pair-later.html',
})
export class PairLaterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PairLaterPage');
  }

  goToFamily() {
    // Navigate to the FamilyPage
    this.navCtrl.setRoot('FamilyPage');
  }
}
