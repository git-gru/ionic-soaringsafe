import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProfileProvider } from '../../providers/profile/profile';


@IonicPage()
@Component({
  selector: 'page-installation-successful',
  templateUrl: 'installation-successful.html',
})
export class InstallationSuccessfulPage {

  deviceName(arg0: any, arg1: any): any {
    throw new Error("Method not implemented.");
  }
  profileData(arg0: any, arg1: any): any {
    throw new Error(
      "Method not implemented.");
  }

  
  profileId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, 
    public profileService: ProfileProvider) {

     this.storage.get('deviceName').then(res=> {
      this.deviceName = res;
    }).catch(error => {
      console.log('InstallationCheck: Error Occured while Fetching Device Name',error);
    });

    console.log('Device Name', this.deviceName);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InstallationSuccessfulPage');

    this.storage.get('profileData').then(res => {
      this.profileData = res;
  
    }).catch(error => {
      console.log('Error Occured while Fetching Profile Data', error);
    });
  
    console.log('profile Data', this.profileData);

    this.profileId = this.navParams.get('profileId');
    this.profileUpdate();
  
  }
  profileUpdate() {
    console.log('profileId inside Installation Successfull', this.profileId);
    const fieldData = {
      status: 'Working',
      devicePaired: true,
    }

      this.profileService.updateProfileField(this.profileId, fieldData).then(() => {
        console.log('Status and deviceParied updated successfully');
      }).catch(error => {
        console.log('InstallationCheck: Error while updating the Fields in Firestore Database', error);
      });
  
  }

  goToFamily() {
    // Navigate to the FamilyPage
    this.navCtrl.setRoot('FamilyPage');
  }
}
