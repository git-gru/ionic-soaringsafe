import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }

  goToLoginToSoaringSafe() {
    // Navigate to the LoginToSoaringSafePage
    this.navCtrl.setRoot('LoginToSoaringSafePage');
  }
}