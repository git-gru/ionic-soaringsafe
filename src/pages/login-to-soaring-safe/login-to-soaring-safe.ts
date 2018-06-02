import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';


@IonicPage()
@Component({
  selector: 'page-login-to-soaring-safe',
  templateUrl: 'login-to-soaring-safe.html',
})
export class LoginToSoaringSafePage {

  userValid: FormGroup;
  email = '';
  password = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadCtrl: LoadingController, 
    public userService: UserProvider, public alertCtrl: AlertController) {
      const tempEmail = navParams.get('email');
      const tempPass = navParams.get('password');

      if(tempEmail != undefined) {
        this.email = tempEmail;
      }
      if(tempPass != undefined) {
        this.password = tempPass;
      }
  }

  ngOnInit() {
    this.userValid = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(7)]),
    });
  }
  
  signupForSoaringSafe() {
    //Navigate to Signup page
    this.navCtrl.setRoot('SignupForSoaringSafePage');
  }
  goToTabs() {
    const email = this.userValid.value.email;
    const password = this.userValid.value.password;
      
    //create a loader
      const loader = this.loadCtrl.create({
        content: "Please wait"
      });
      loader.present();

       //Call and Pass the user's information to provider for signup process with firebase
    this.userService.loginUser(email, password).then((res: any) => {
      loader.dismiss();
      if (res.success) {
        //Navigate to TabsPage
        this.navCtrl.setRoot('FamilyPage');
      } else {
        alert("Error" + res);
      }
    }).catch(error=> {
      loader.dismiss();
      console.log('Errors While Logging In User', error);
      this.wrongCrendential(email);
    });
    
  }

  wrongCrendential(email) {
    
    let alert = this.alertCtrl.create({
      title: 'Invalid Password', 
      message: 'Password is not correct. Would you like to try again or recover your password?',
      buttons: [
        {
          text: 'Try Again',
          handler: data => {
            // this.navCtrl.push(this.navCtrl.getActive().component);
            alert.emit();
          }
        },
        {
          text: 'Recover Password',
          handler: data => {
            this.navCtrl.setRoot('ResetPasswordPage',{email});
          }
        }
      ]
    });
    // alert.onDidDismiss(() =>{
    //   this.userValid.setValue({password : '', email: email});
    // });
    alert.present();
  }

}
