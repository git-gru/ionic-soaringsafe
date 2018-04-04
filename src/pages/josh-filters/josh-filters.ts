import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-josh-filters',
  templateUrl: 'josh-filters.html',
})
export class JoshFiltersPage {

  profileName: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage) {

    this.storage.get('pName').then(res=>{
      this.profileName = res;
    }).catch(error=>{
      console.log('JoshDevices: Error while getting profileName', error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoshFiltersPage');
  }

  goToAddCustomFilter() {
    // Navigate to the AddCustomFilterPage
    this.navCtrl.push('AddCustomFilterPage');
  }

}
