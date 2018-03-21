import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-set-initial-filters',
  templateUrl: 'set-initial-filters.html',
})
export class SetInitialFiltersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetInitialFiltersPage');
  }

  goToSetInitialBedtime() {
    // Navigate to the SetInitialBedtimePage
    this.navCtrl.push('SetInitialBedtimePage');
  }
}
