import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  userValid: FormGroup;
  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userService: UserProvider, public dataService: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
    this.email = this.navParams.get('email');
  }
  ngOnInit() {
    this.userValid = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }
  resetPassword() {
    this.userService.passwordReset(this.email).then(() => {
      console.log('Password Recovery Mail sent Successfully');
      //show Alert
      this.dataService.showAlert('Password Recovery', 'Password Recovery Mail sent Successfully. Check Your Inbox and follow the Instruction to Recover the Password');
      this.navCtrl.setRoot('LoginToSoaringSafePage',{email: this.email});

    }).catch(error => {
      console.log('Reset Password: Error while sending Password recovery Mail', error);
    });
  }

}
