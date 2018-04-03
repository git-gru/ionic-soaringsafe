import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-add-custom-filter',
  templateUrl: 'add-custom-filter.html',
})
export class AddCustomFilterPage {
  // state: string = '';
  customFilter = {
    status: 'ALLOWED',
    url: ''
  }
  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
  }
  addCustomFilter() {
    console.log('Selected Acess Value ', this.customFilter);
    this.viewCtrl.dismiss(this.customFilter);
  }

  cancelFilter() {
    this.viewCtrl.dismiss();
  }
}
