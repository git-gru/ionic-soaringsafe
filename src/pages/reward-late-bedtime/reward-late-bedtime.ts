import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
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
  status: string = '';
  rewardBedtimes = {
    creation_time: undefined,
    status: '',
    bedtime: '',
    rewardType: ''
  }
  toastMessage: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserProvider,
    public profileService: ProfileProvider, public viewCtrl: ViewController) {
    this.profileInfo = navParams.get('profileInfo');
    this.profileId = this.profileInfo.profileId;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RewardLateBedtimePage');
    this.profileService.getRewardBedtime(this.profileId).subscribe(res => {
      res.forEach(output => {
        this.status = JSON.parse(JSON.stringify(output)).status;
        this.bedtime = JSON.parse(JSON.stringify(output)).bedtime;
      });
    }, error => {
      console.log('Error While Getting Reward Bedtimes', error);
    });
  }
  deletBedTime() {
    this.profileService.deleteRewardBedtime(this.profileId).then(res => {
      this.toastMessage = 'Extended bedtime cleared';
      this.navCtrl.push('JoshPage', { profileInfo: this.profileInfo, toastMessage: this.toastMessage })
        .then(() => {

          const index = this.viewCtrl.index;

          for (let i = index; i > 0; i--) {
            this.navCtrl.remove(i);
          }
        }).catch(error => {
          console.log('Error While Poping a view', error);
        });
    }).catch(error => {
      console.log('Error While Clearing the extended bedtimes', error);
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

    this.profileService.setRewardBedtime(this.profileId, this.rewardBedtimes)
      .then(res => {
        console.log('SuccessFully Added', res);
        this.toastMessage = 'Reward Bedtimes have been updated. Changes may take up to 10 minutes to show on the device';
        this.navCtrl.push('JoshPage', { profileInfo: this.profileInfo, toastMessage: this.toastMessage })
          .then(() => {

            const index = this.viewCtrl.index;

            for (let i = index; i > 0; i--) {
              this.navCtrl.remove(i);
            }
          }).catch(error => {
            console.log('Error While Poping a view', error);
          });
      }).catch(error => {
        console.log('Errors While Storing Reward Bedtimes', error);
      });
  }
}
