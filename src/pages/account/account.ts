import { Component } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  
  constructor(public navCtrl: NavController, public app: App, public userService: UserProvider) {

  }

  goToLoginToSoaringSafe() {
    this.userService.logOut().then(res=>{
         // Navigate to the LoginToSoaringSafePage
        this.app.getRootNav().setRoot('LoginToSoaringSafePage');
    });
  }
}