import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { ProfileProvider } from '../../providers/profile/profile';


@IonicPage()
@Component({
  selector: 'page-reward-late-bedtime',
  templateUrl: 'reward-late-bedtime.html',
})
export class RewardLateBedtimePage {

  profileInfo: any;
  profileId: any;
  bedtime: string = '';
  rewardBedtimes = {
    creation_time: undefined,
    status: '',
    bedtime: '',
    rewardType: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserProvider, 
    public profileService: ProfileProvider) {
    this.profileInfo = navParams.get('profileInfo');
    this.profileId = this.profileInfo.profileId;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RewardLateBedtimePage');
    this.profileService.getRewardBedtime(this.profileId).then(res=>{

    }).catch(error => {
      console.log('Error While Getting Reward Bedtimes', error);
    });
  }

  goToRewardJosh() {
    //Get User current TimeStamp
    const tempTime = this.userService.getUserTimestamp();

    this.rewardBedtimes.bedtime = this.bedtime;
    this.rewardBedtimes.creation_time = tempTime;
    this.rewardBedtimes.status = 'enabled';
    this.rewardBedtimes.rewardType = 'Late Bedtime';

    console.log('Reward Bedtime', this.rewardBedtimes);

    this.profileService.setRewardBedtime(this.profileId, this.rewardBedtimes);
    // Navigation to the RewardJoshPage
    //this.navCtrl.push('RewardJoshPage');
  }
}
