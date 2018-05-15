import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-add-custom-filter',
  templateUrl: 'add-custom-filter.html',
})
export class AddCustomFilterPage {
  // state: string = '';
  urlValidate: FormGroup;

  customFilter = {
    status: 'BLOCKED',  //Make Blocked the default for a new custom filter
    url: ''
  };
  title: string = 'Add';
  cancelOrDelete = 'Cancel';

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public params: NavParams) {
    const temp = params.get('customFilter');
    if(Object.keys(temp).length != 0 ) {
      this.title = 'Edit';
      this.cancelOrDelete = 'Delete Custom Filter';
      this.customFilter.status = JSON.parse(JSON.stringify(temp)).status;
      this.customFilter.url = JSON.parse(JSON.stringify(temp)).url;
    }
  }

  ngOnInit() {
    let urlPattern = '(?:(?:(?:ht|f)tp)s?://)?[\\w_-]+(?:\\.[\\w_-]+)+([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?';
    this.urlValidate = new FormGroup({
      url: new FormControl('', [Validators.required, Validators.pattern(urlPattern)])      
    });
  }

  addCustomFilter() {
        
    console.log('Selected Acess Value ', this.customFilter);
    this.viewCtrl.dismiss(this.customFilter);
  }

  cancelFilter() {
    this.viewCtrl.dismiss(this.customFilter);
  }
}
