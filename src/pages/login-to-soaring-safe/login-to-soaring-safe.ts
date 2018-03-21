import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login-to-soaring-safe',
  templateUrl: 'login-to-soaring-safe.html',
})
export class LoginToSoaringSafePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginToSoaringSafePage');
  }
  signupForSoaringSafe() {
    //Navigate to Signup page
    this.navCtrl.setRoot('SignupForSoaringSafePage');
  }
  goToTabs() {
    //Navigate to TabsPage
    this.navCtrl.setRoot('TabsControllerPage');
  }

}
