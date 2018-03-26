import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-login-to-soaring-safe',
  templateUrl: 'login-to-soaring-safe.html',
})
export class LoginToSoaringSafePage {

  userValid: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.userValid = new FormGroup({
      parentName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(7)]),
    });
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
