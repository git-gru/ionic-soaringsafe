import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-set-initial-bedtime',
  templateUrl: 'set-initial-bedtime.html',
})
export class SetInitialBedtimePage {

  profileData: any; 
  shownGroup = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.storage.get('profileData').then(res => {
      this.profileData = res;
    }).catch(error => {
      console.log('Error Occured while Fetching Profile Data', error);
    });

    console.log('profile Data', this.profileData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetInitialBedtimePage profiledata', this.profileData);
  }

   //For toogling showing more information
   toggleGroup(group) {  
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }
  isGroupShown(group) {
    return this.shownGroup === group;
  }
}
