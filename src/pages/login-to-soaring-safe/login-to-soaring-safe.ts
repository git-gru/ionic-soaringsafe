import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';


@IonicPage()
@Component({
  selector: 'page-login-to-soaring-safe',
  templateUrl: 'login-to-soaring-safe.html',
})
export class LoginToSoaringSafePage {

  userValid: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadCtrl: LoadingController, 
    public userService: UserProvider) {
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
        this.navCtrl.setRoot('TabsControllerPage');
      } else {
        alert("Error" + res);
      }
    }).catch(error=> {
      console.log('Error While SigningUp user', error);
    });
    
  }
}
