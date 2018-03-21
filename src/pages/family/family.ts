import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-family',
  templateUrl: 'family.html',
})
export class FamilyPage {
  
  constructor(public navCtrl: NavController) {
  }
  goToJosh() {
    // Navigate to the JoshPage
    this.navCtrl.push('JoshPage');
  }

  goToCreateChildProfile() {
    // navigate to the CreateChildProfilePage
    this.navCtrl.setRoot('CreateChildProfilePage');
  }
}
