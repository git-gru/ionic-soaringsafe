import { Component } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
    selector: 'page-account',
    templateUrl: 'account.html',
})
export class AccountPage {

    user = {}

    constructor(public navCtrl: NavController, public app: App, public userService: UserProvider) {

    }

    ionViewDidLoad() {
        this.userService.getUser(this.userService.getCurrentUserEmail()).subscribe((res: any) => {
            //get user Data
            if (res.length > 0) {
                this.user = res[0]
            }
        }, (error) => {
            console.log('errors', error);
        });
    }

    goToLoginToSoaringSafe() {
        this.userService.logOut().then(res => {
            // Navigate to the LoginToSoaringSafePage
            this.app.getRootNav().setRoot('LoginToSoaringSafePage');
        });
    }
}