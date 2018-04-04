import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-josh-devices',
  templateUrl: 'josh-devices.html',
})
export class JoshDevicesPage {

  profileId: string;
  profileName: string;

  devices = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public dataService: DataProvider, public storage: Storage) {
    this.profileId = navParams.get('profileId');
    this.storage.get('pName').then(res=>{
      this.profileName = res;
    }).catch(error=>{
      console.log('JoshDevices: Error while getting profileName', error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoshDevicesPage');
    //Get Devices from firestore Database
    this.dataService.getDevices(this.profileId).then(snapshot=>{
      if(snapshot) {
        snapshot.forEach(res => {
          this.devices = res;
          console.log('Profiles : ', this.devices);
        });
      }
    }).catch(error => {
      console.log('Josh-Devices: Error While getting Devices ', error);
    });
  }

  goToJoshIPhone6(device) {
    console.log('Device Info', device);
    // Navigate to the JoshIPhone6Page
    this.navCtrl.push('JoshIphone6Page', {device: device, profileId: this.profileId});
  }

  goToIsThisHalleIPad() {
    // Navigate to the IsThisHalleIPadPage
    this.navCtrl.push('IsThisHalleIPadPage');
  }

  goToStartPairing() {
    // Navigate to the StartPairingPage
    this.navCtrl.push('StartPairingPage');
  }
}
