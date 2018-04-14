import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-josh',
  templateUrl: 'josh.html',
})
export class JoshPage {

  profileInfo: any;
  toastMessage: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage, public toastCtrl: ToastController) {
      //get Profile Info
      try {
        this.profileInfo = navParams.get('profileInfo');
        const pName = this.profileInfo.profileName;
        this.storage.set('pName', pName);

        this.toastMessage = navParams.get('toastMessage');
        console.log('toastMessageInside constrctor', this.toastMessage);
      } catch(error){
        console.log('Error ')
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoshPage');
    if(this.toastMessage) {
      const toast = this.toastCtrl.create({
        duration: 2000,
        message: this.toastMessage
      });
      toast.present();
    }
  }

  goToRewardJosh() {
    // Navigate to the RewardJoshPage
    this.navCtrl.push('RewardJoshPage');
  }

  goToJoshDevices(profileId) {
    console.log('Profile Id', profileId);
    // Navigate to the JoshDevicesPage
    this.navCtrl.push('JoshDevicesPage', { profileId: profileId });
  }

  goToJoshReports() {
    // Navigate to the JoshReportsPage
    this.navCtrl.push('JoshReportsPage', { profileInfo: this.profileInfo });
  }

  goToJoshFilters(profileId) {
    // Navigate to the JoshFiltersPage
    // this.navCtrl.push('JoshFiltersPage', { profileId: profileId });
    this.navCtrl.push('JoshFiltersPage', { profileInfo: this.profileInfo });    
  }

  goToJoshBedtime(profileId) {
    // Navigate to the JoshBedtimePage
    this.navCtrl.push('JoshBedtimePage', { profileId: profileId });
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
    this.navCtrl.push('RewardLateBedtimePage', { profileInfo: this.profileInfo });
  }
}
