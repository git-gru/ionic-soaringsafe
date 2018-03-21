import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-signup-for-soaring-safe',
  templateUrl: 'signup-for-soaring-safe.html',
})
export class SignupForSoaringSafePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupForSoaringSafePage');
  }
  goToLoginToSoaringSafe() {
    //Already Have Account, Navigate to login page
    this.navCtrl.setRoot('LoginToSoaringSafePage');
  }
  goToCreateChildProfile() {
    //Navigate to Create Child Profile
    this.navCtrl.setRoot('CreateChildProfilePage');
  }
}
