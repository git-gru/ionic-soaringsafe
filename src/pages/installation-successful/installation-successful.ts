import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-installation-successful',
  templateUrl: 'installation-successful.html',
})
export class InstallationSuccessfulPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InstallationSuccessfulPage');
  }

  goToFamily() {
    // Navigate to the FamilyPage
    this.navCtrl.setRoot('TabsControllerPage');
  }
}
