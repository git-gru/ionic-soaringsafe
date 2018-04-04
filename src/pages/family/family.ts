import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';


@IonicPage()
@Component({
  selector: 'page-family',
  templateUrl: 'family.html',
})
export class FamilyPage {
  profiles = [];
  constructor(public navCtrl: NavController, public dataService: DataProvider) {
  }
  ionViewDidLoad() {
    this.dataService.getProfiles().then(snapshot=> {
      if(snapshot) {
        snapshot.forEach(res => {
          this.profiles = res;
          console.log('Profiles : ', this.profiles);
        });
      }
    }, error=>{
      console.log('FamilyPage: Errors While get Profiles from firestore', error);
    });
  }
  goToJosh(pInfo) {
    console.log('Profile Info', pInfo);
    // Navigate to the JoshPage
    this.navCtrl.push('JoshPage' , {profileInfo: pInfo});
  }

  goToCreateChildProfile() {
    // navigate to the CreateChildProfilePage
    this.navCtrl.setRoot('CreateChildProfilePage');
  }
}
