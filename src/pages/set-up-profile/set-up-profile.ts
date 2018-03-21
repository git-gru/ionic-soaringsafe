import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-set-up-profile',
  templateUrl: 'set-up-profile.html',
})
export class SetUpProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetUpProfilePage');
  }
  goToSetInitialFilters() {
    // Navigate to the SetInitialFiltersPage
    this.navCtrl.push('SetInitialFiltersPage');
  }
}
