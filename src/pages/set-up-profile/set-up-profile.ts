import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-set-up-profile',
  templateUrl: 'set-up-profile.html',
})
export class SetUpProfilePage {
  profileData = {};
  ageGroup = 'KID';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.profileData = this.navParams.get('profileData');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetUpProfilePage');
  }
  goToSetInitialFilters() {
    this.profileData["ageGroup"] = this.ageGroup;
    // Navigate to the SetInitialFiltersPage
    this.navCtrl.push('SetInitialFiltersPage', { profileData: this.profileData});
  }
  onAgeChanged(selectedAge) {
    //Get Selected Age Group and add to profile Data
    this.profileData["ageGroup"] = selectedAge.value;
  }
}
