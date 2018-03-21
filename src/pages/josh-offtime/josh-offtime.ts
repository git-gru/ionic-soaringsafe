import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-josh-offtime',
  templateUrl: 'josh-offtime.html',
})
export class JoshOfftimePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoshOfftimePage');
  }

  goToAddOfftime() {
    // Navigate to the AddOfftimePage
    this.navCtrl.push('AddOfftimePage');
  }
}
