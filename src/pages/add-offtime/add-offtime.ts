import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { JoshOfftimePage } from '../josh-offtime/josh-offtime';

@IonicPage()
@Component({
  selector: 'page-add-offtime',
  templateUrl: 'add-offtime.html',
})
export class AddOfftimePage {
  
  constructor(public navCtrl: NavController) {
  }
  goToJoshOfftime() {
   // Navigate to the JoshOfftimePage
   this.navCtrl.push('JoshOfftimePage');
  }
}

