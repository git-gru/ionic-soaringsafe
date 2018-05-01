import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProfileProvider } from '../../providers/profile/profile';


@IonicPage()
@Component({
  selector: 'page-pair-later',
  templateUrl: 'pair-later.html',
})
export class PairLaterPage {

  profileData(arg0: any, arg1: any): any {
    throw new Error("Method not implemented.");
  }
  deviceName(arg0: any, arg1: any): any {
    throw new Error("Method not implemented.");
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public profileService: ProfileProvider) {

    this.storage.get('profileData').then(res => {
      this.profileData = res;
    }).catch(error => {
      console.log('Error Occured while Fetching Profile Data', error);
    });

    console.log('profile Data', this.profileData);

    this.storage.get('deviceName').then(res=> {
      this.deviceName = res;
    }).catch(error => {
      console.log('InstallationCheck: Error Occured while Fetching Device Name',error);
    });

    console.log('Device Name', this.deviceName);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PairLaterPage');
  }

  goToFamily() {
    // Navigate to the FamilyPage
    // what is the profileId: 
    console.log("pair-later goToFamily profielId", this.profileData["profileId"])
    this.profileService.updateDeviceStatus(this.profileData["profileId"], "Retry pairing", this.deviceName);
    
    this.navCtrl.setRoot('FamilyPage');
  }
}
