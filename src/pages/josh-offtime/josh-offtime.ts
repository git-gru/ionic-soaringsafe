import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProfileProvider } from '../../providers/profile/profile';

@IonicPage()
@Component({
  selector: 'page-josh-offtime',
  templateUrl: 'josh-offtime.html',
})
export class JoshOfftimePage {
  
  profileName: string = '';
  profileId: string = '';
  offtimes = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
    public profileService: ProfileProvider) {
  
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoshOfftimePage'); 
    this.storage.get('profileData').then(res => {
      this.profileName = res.profileName;
      this.profileId = res.profileId;
      //Get Offtimes Data    
      this.getOfftimeData();
    }).catch(error => { 
      console.log('JoshOfftime: Error while getting profileName', error);
    });
  }

  getOfftimeData() {
    this.profileService.getOfftimes(this.profileId).subscribe(off => {
      off.forEach(res=> {
        console.log('Offtime Data');
        console.log(res);
        
        if(JSON.parse(JSON.stringify(res)).type == 'OFFTIME') {
          this.offtimes.push(res);
          return;
        }
        
      });
    }, error => {
      console.log('JoshOfftimesPage: Error While getting Offtime Data');
      console.log(error);
    });
  }

  goToAddOfftime() {
    // Navigate to the AddOfftimePage
    this.navCtrl.push('AddOfftimePage');
  }
}
