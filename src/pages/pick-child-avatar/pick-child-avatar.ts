import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-pick-child-avatar',
  templateUrl: 'pick-child-avatar.html',
})
export class PickChildAvatarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickChildAvatarPage');
  }
  goToSetUpProfile(){
    //Navigate to the Setup Profile page
    this.navCtrl.push('SetUpProfilePage');
  }
}
