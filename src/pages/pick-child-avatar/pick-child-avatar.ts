import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-pick-child-avatar',
  templateUrl: 'pick-child-avatar.html',
})
export class PickChildAvatarPage {
  profileName: string = '';
  avatarList = [];
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, public loadingCtrl: LoadingController) {

    //Get Profile Name
    this.profileName = this.navParams.get('pName');
    // console.log('Paredfd', this.profileName);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickChildAvatarPage');
    this.loader = this.loadingCtrl.create({
      content: 'Loading...'
    });
    this.loader.present();

    this.dataProvider.getAvatars().subscribe((res:any)=>{
      // console.log('Avatars Data', res);
      //get and sort Avatar Data
      this.avatarList = res.sort((a,b)=> a.DisplayRank - b.DisplayRank);

    }, (error)=>{
      console.log('errors', error);
    });
    this.loader.dismiss();
  }
  goToSetUpProfile(avatar){
    avatar["profileName"] = this.profileName;
    console.log('avatars', avatar);
    //Navigate to the Setup Profile page
    this.navCtrl.push('SetUpProfilePage', {profileData: avatar});
  }
}
