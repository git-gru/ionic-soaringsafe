import { Component } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
    selector: 'page-account',
    templateUrl: 'account.html',
})
export class AccountPage {

    user = {}

    constructor(public navCtrl: NavController, public app: App, public userService: UserProvider, 
        public dataService: DataProvider) {

    } 

    ionViewDidLoad() {
        // this.userService.getUser(this.userService.getCurrentUserEmail()).subscribe((res: any) => {
        //     //get user Data
        //     if (res.length > 0) {
        //         this.user = res[0]
        //     }
        // }, (error) => {
        //     console.log('errors', error);
        // });
        
        this.dataService.getCurrentUserData().take(1).subscribe(userData=>{
            this.user = userData;
            console.log('User Data: ');
            console.log(this.user);
        }, error=>{
            console.log("Error While getting user data");
            console.log(error);
        });

    }

    goToLoginToSoaringSafe() {
        this.userService.logOut().then(res => {
            // Navigate to the LoginToSoaringSafePage
            this.app.getRootNav().setRoot('WelcomeWizardPage');
        });
    }
    openPasswordChange() {
        let temp = JSON.parse(JSON.stringify(this.user));
        console.log('Email: ', temp.email);
        this.navCtrl.push('ChangePasswordPage', {email: temp.email});
    }
}