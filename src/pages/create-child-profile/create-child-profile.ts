import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-create-child-profile',
  templateUrl: 'create-child-profile.html',
})
export class CreateChildProfilePage {
  
  constructor(public navCtrl: NavController) {
  }
  goToPickChildAvatar(){
    // navigate to Pickchild avatar page
    this.navCtrl.push('PickChildAvatarPage');
  }
}
