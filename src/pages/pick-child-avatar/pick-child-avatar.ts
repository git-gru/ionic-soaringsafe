import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-pick-child-avatar',
  templateUrl: 'pick-child-avatar.html',
})
export class PickChildAvatarPage {
  profileName: string = '';
  avatarList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {

    //Get Profile Name
    this.profileName = this.navParams.get('pName');
    // console.log('Paredfd', this.profileName);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickChildAvatarPage');

    this.dataProvider.getAvatars().subscribe((res:any)=>{
      // console.log('Avatars Data', res);
      //get and sort Avatar Data
      this.avatarList = res.sort((a,b)=> a.DisplayRank - b.DisplayRank);

    }, (error)=>{
      console.log('errors', error);
    });
  }
  goToSetUpProfile(avatar){
    avatar["profileName"] = this.profileName;
    console.log('avatars', avatar);
    //Navigate to the Setup Profile page
    this.navCtrl.push('SetUpProfilePage', {profileData: avatar});
  }
}
