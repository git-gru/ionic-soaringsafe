import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  userValid: FormGroup;
  email:string;
  oldPassword:any;
  newPassword: any;
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserProvider,
    public loadingCtrl: LoadingController, public dataService: DataProvider) {
  }
  ngOnInit() {
    this.userValid = new FormGroup({
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(7)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(7)]),
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');

    this.email = this.navParams.get('email');

    this.loader = this.loadingCtrl.create({
      content: 'Changing password.....'
    });

  }

  passwordChange() {
    console.log('Email: ', this.email);
    console.log('Old Password: ', this.oldPassword);
    console.log('New Password: ', this.newPassword);

    this.loader.present();

    this.userService.changePassword(this.email, this.oldPassword, this.newPassword).then(() => {
      console.log('Password Updated Successfully');
      this.loader.dismiss();
      this.dataService.showAlert('ChangePassword', 'Password Changed Successfully');
      this.navCtrl.pop();
    }).catch(error => {
      this.loader.dismiss();
      this.dataService.showAlert(error.code, 'You have Entered Wrong Password, Try again with Correct Password');
      console.log('ChangePasswordPage: Error While updating password', error);
    });
  }

}
