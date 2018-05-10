import { Component } from '@angular/core';
import { ProfileProvider } from '../../providers/profile/profile';
import { NavController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserProvider } from '../../providers/user/user';

declare let jQuery:any;

@Component({
  selector: 'josh-bedtime',
  templateUrl: 'josh-bedtime.html'
})
export class JoshBedtimeComponent {

  isEnabled: boolean = false;
  weeknightBedtime:string = '';
  weeknightAwaketime:string = '';
  weekendBedtime: string = '';
  weekendAwaketime: string = '';
  loader: any;
  offtimes = [];

  constructor(public profileService: ProfileProvider, public navCtrl: NavController, public loadingCtrl: LoadingController,
    public storage: Storage, public userService: UserProvider) {
    console.log('Hello JoshBedtimeComponent Component');
    var vtoggle= setInterval(()=>{
      (<any>jQuery)('.toggle-jq').removeClass('toggle-md').removeClass('hidden').css({float:'right'});

    },500);
    setTimeout(()=>{

      clearInterval(vtoggle);

    },10000);
    //set initial values of bedtime & aweake times
    this.weeknightBedtime = '84';
    this.weeknightAwaketime = '20';
    this.weekendBedtime = '86';
    this.weekendAwaketime = '20';

  }

  createProfile() {
    // console.log('value of WeeknightBed Time', this.weeknightBedtime);
    // console.log('value of WeeknightAwake Time', this.weeknightAwaketime);
    // console.log('value of WeekEndBed Time', this.weekendBedtime);
    // console.log('value of WeekendAwake Time', this.weekendAwaketime);
    this.loader = this.loadingCtrl.create({
      content: 'Creating Profile...'
    });
    this.loader.present();

    this.offtimes = [
      {
        offtime: 'Weeknights',
        bedtime: this.weeknightBedtime,
        awake:  this.weeknightAwaketime,
        enabled: this.isEnabled
      },
      {
        offtime: 'Weekends',
        bedtime: this.weekendBedtime,
        awake:  this.weekendAwaketime,
        enabled: this.isEnabled
      }
    ];
    console.log('Value of Josh page', this.offtimes);

    this.profileService.createProfile(this.offtimes).then(res=>{
          console.log('response from Profile Provider', res);
          //const temp = JSON.parse(JSON.stringify(res)).profileId;
          const temp = res;
          console.log('profileId from Profile Provider', temp);
          this.storage.set('profileId',temp);
          this.loader.dismiss();
          this.navCtrl.setRoot('StartPairingPage', {profileId: temp});
    }).catch(error => {
      this.loader.dismiss();
      console.log('Josh-bedtimes: Error While Creating Profile ', error);
    });
  }
  toggleBedTime(){
      if(this.isEnabled){
        this.isEnabled=false;
      }
      else{
        this.isEnabled=true;
      }


  }

}
