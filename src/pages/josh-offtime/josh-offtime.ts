import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-josh-offtime',
  templateUrl: 'josh-offtime.html',
})
export class JoshOfftimePage {
  
  profileName: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  
    this.storage.get('pName').then(res => {
      this.profileName = res;
    }).catch(error => { 
      console.log('JoshOfftime: Error while getting profileName', error);
    });
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoshOfftimePage'); 
  }

  goToAddOfftime() {
    // Navigate to the AddOfftimePage
    this.navCtrl.push('AddOfftimePage');
  }
}
