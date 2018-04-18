import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';


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
  title: string = 'Add'
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public params: NavParams) {
    const temp = params.get('customFilter');
    if(Object.keys(temp).length != 0 ) {
      this.title = 'Edit';
      this.customFilter.status = JSON.parse(JSON.stringify(temp)).status;
      this.customFilter.url = JSON.parse(JSON.stringify(temp)).url;
    }
  }
  addCustomFilter() {
    console.log('Selected Acess Value ', this.customFilter);
    this.viewCtrl.dismiss(this.customFilter);
  }

  cancelFilter() {
    this.viewCtrl.dismiss();
  }
}
