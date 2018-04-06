import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-josh',
  templateUrl: 'josh.html',
})
export class JoshPage {

  profileInfo: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage) {
    this.profileInfo = navParams.get('profileInfo');
    const pName = this.profileInfo.profileName;
    this.storage.set('pName', pName );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoshPage');
  }

  goToRewardJosh() {
    // Navigate to the RewardJoshPage
    this.navCtrl.push('RewardJoshPage');
  }

  goToJoshDevices(profileId) {
    console.log('Profile Id', profileId);
    // Navigate to the JoshDevicesPage
    this.navCtrl.push('JoshDevicesPage', {profileId: profileId});
  }

  goToJoshReports() {
    // Navigate to the JoshReportsPage
    this.navCtrl.push('JoshReportsPage');
  }

  goToJoshFilters(profileId) {
    // Navigate to the JoshFiltersPage
    this.navCtrl.push('JoshFiltersPage', {profileId: profileId});
  }

  goToJoshBedtime() {
    // Navigate to the JoshBedtimePage
    this.navCtrl.push('JoshBedtimePage');
  }

  goToJoshOfftime() {
    // Navigate to the JoshOfftimePage
    this.navCtrl.push('JoshOfftimePage');
  }

  goToJoshTimeLimits() {
    // Navigate to the JoshTimeLimitsPage
    this.navCtrl.push('JoshTimeLimitsPage');
  }

  goToStartPairing() {
    // Navigate to the StartPairingPage
    this.navCtrl.push('StartPairingPage');
  }

  goToLateBedtime() {
    // Navigate to the StartPairingPage
    this.navCtrl.push('RewardLateBedtimePage');
  }
}
