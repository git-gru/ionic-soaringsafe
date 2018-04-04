import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';


@IonicPage()
@Component({
  selector: 'page-josh-iphone6',
  templateUrl: 'josh-iphone6.html',
})
export class JoshIphone6Page {

  deviceInfo:any;
  profileId: string;
  newDeviceName: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public profileService : ProfileProvider) {
    this.profileId = navParams.get('profileId');
    this.deviceInfo = navParams.get('device');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoshIphone6Page');
  }
  goToJoshDevices() {
    console.log('new Device Name', this.newDeviceName);
    console.log('Device Name', this.deviceInfo.deviceName);
    this.profileService.updateDeviceName(this.newDeviceName, this.profileId, this.deviceInfo.deviceName).then(res=> {
      if(res) {
        this.navCtrl.setRoot('JoshDevicesPage', {profileId: this.profileId});
      }
    }).catch(error => {
      console.log('JoshIphone6Page:  Error', error);
    });
  }
}
