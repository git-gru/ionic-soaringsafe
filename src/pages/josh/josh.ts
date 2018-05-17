import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProfileProvider } from '../../providers/profile/profile';


@IonicPage()
@Component({
  selector: 'page-josh',
  templateUrl: 'josh.html',
})
export class JoshPage {

  profileInfo: any;
  toastMessage: string;
  profileStatus: string = '';
  isPaused:boolean;
  status: string = '';
  shownGroup = null;
  noDevicePaired:boolean;
  offtimesEnabled: boolean = false; //TODO - TEST FOR THIS AND MAKE TRUE IF CURRENTLY OFFTIMES ARE ENABLED, like we test if current status is paused

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage, public toastCtrl: ToastController, public profileService: ProfileProvider) {
      //get Profile Info
      try {
        this.profileInfo = navParams.get('profileInfo');
        console.log('profileInfo inside of Josh', this.profileInfo);
        const pName = this.profileInfo.profileName;
        
        if(this.profileInfo.status != 'SoaringSafe Enabled') {
          this.profileStatus = 'Internet Paused';
          this.status = 'Internet Paused';
          this.isPaused = true;
        } else {
          this.status = 'SoaringSafe Enabled';
          this.isPaused = false;
        }
        
        console.log('device paired', this.profileInfo.devicePaired);
        if(this.profileInfo.devicePaired !== undefined) {
          this.noDevicePaired = !this.profileInfo.devicePaired;
        }
        else {
          this.noDevicePaired = false; //default value
        }
        
        
        this.storage.set('pName', pName);

        this.storage.set('profileData', this.profileInfo);
        this.toastMessage = navParams.get('toastMessage');
        console.log('toastMessageInside constrctor', this.toastMessage);

      } catch(error){
        console.log('Error ')
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoshPage. ProfileId:', this.profileInfo.profileId);
    if(this.toastMessage) {
      const toast = this.toastCtrl.create({
        duration: 4000,
        position: 'top',
        message: this.toastMessage
      });
      toast.present();
    }
  }

  // Change Internet Settings to pause/play 
  pauseInternet(profileId) {
    let msg = '';
    if(this.status == 'SoaringSafe Enabled') {
      msg = 'Internet has been Paused';
      this.profileStatus = 'Internet Paused';
      this.status = 'Internet Paused';
      this.isPaused = true;
    } else {
      msg = 'Internet has been Enabled';
      this.profileStatus = '';
      this.status = 'SoaringSafe Enabled';

      this.isPaused = false;
    }
    const toast = this.toastCtrl.create({
      duration: 2000,
      position: "top",
      message: msg
    });
    toast.present();
    this.profileService.updateInternetStatus(profileId, this.status).then(res=>{
      console.log(msg);
    }).catch(error=>{
      console.log('Errors While Updating Internet Status', Error);
    });
  
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

  goToStartPairing(profileId) {
    // Navigate to the StartPairingPage
    this.navCtrl.push('StartPairingPage', { profileId: profileId });
  }

  goToLateBedtime() {
    // Navigate to the StartPairingPage
    this.navCtrl.push('RewardLateBedtimePage', { profileInfo: this.profileInfo });
  }

   //For toogling more information
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
