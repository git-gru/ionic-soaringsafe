import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-josh-filters',
  templateUrl: 'josh-filters.html',
})
export class JoshFiltersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoshFiltersPage');
  }

  goToAddCustomFilter() {
    // Navigate to the AddCustomFilterPage
    this.navCtrl.push('AddCustomFilterPage');
  }

}
