import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-add-custom-filter',
  templateUrl: 'add-custom-filter.html',
})
export class AddCustomFilterPage {
  
  constructor(public navCtrl: NavController) {
  }
  goToJoshFilters() {
    // Navigate to the JoshFiltersPage
    this.navCtrl.push('JoshFiltersPage');
  }
}
