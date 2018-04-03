import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormControl, Validators, FormBuilder, EmailValidator, FormGroup } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-signup-for-soaring-safe',
  templateUrl: 'signup-for-soaring-safe.html',
})
export class SignupForSoaringSafePage implements OnInit {

  userValid: FormGroup;
  user = {} as User;
  userTimestamp: number; 

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, public formBuilder: FormBuilder,
    public toast: ToastController, public loadCtrl: LoadingController, public userService: UserProvider) {
      this.userTimestamp = this.userService.getUserTimestamp();
  }

  ngOnInit() {
    this.userValid = new FormGroup({
      parentName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(7)]),
    });
  }

  goToCreateChildProfile() {
    //Get values from form
    const userInfo = this.userValid.value;

    this.user = {
      parentName: userInfo.parentName,
      email: userInfo.email,
      password: userInfo.password,
      timestamp: this.userTimestamp
    }
    //create a loader
    const loader = this.loadCtrl.create({
      content: "Please wait"
    });
    loader.present();

    //Call and Pass the user's information to provider for signup process with firebase
    this.userService.signUpUser(this.user).then((res: any) => {
      loader.dismiss();
      if (res.success) {
        //Navigate to Create Child Profile
        this.navCtrl.setRoot('CreateChildProfilePage');
      } else {
        alert("Error" + res);
      }
    }).catch(error=> {
      console.log('Error While SigningUp user', error);
    });
  }

  goToLoginToSoaringSafe() {
    //Already Have Account, Navigate to login page
    this.navCtrl.setRoot('LoginToSoaringSafePage');
  }
  signInWithGoogle() {
    this.userService.googleSignIn(this.userTimestamp).then(res=>{
      if(res) {
        //Navigate to Create Child Profile
        this.navCtrl.setRoot('CreateChildProfilePage');
      }
    }).catch(error => {
      console.log('Errors', error);
    });
  }
}
