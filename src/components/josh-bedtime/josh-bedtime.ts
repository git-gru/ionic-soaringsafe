import { Component } from '@angular/core';
import { ProfileProvider } from '../../providers/profile/profile';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'josh-bedtime',
  templateUrl: 'josh-bedtime.html'
})
export class JoshBedtimeComponent {

  customize: boolean = false;
  weeknightBedtime:string = '';
  weeknightAwaketime:string = '';
  weekendBedtime: string = '';
  weekendAwaketime: string = '';

  offtimes = [];

  constructor(public profileService: ProfileProvider, public navCtrl: NavController,
    public storage: Storage) {
    console.log('Hello JoshBedtimeComponent Component');

    
  }
   
  createProfile() {
    // console.log('value of WeeknightBed Time', this.weeknightBedtime);
    // console.log('value of WeeknightAwake Time', this.weeknightAwaketime);
    // console.log('value of WeekEndBed Time', this.weekendBedtime);
    // console.log('value of WeekendAwake Time', this.weekendAwaketime);

    this.offtimes = [
      {
        offtime: 'Weeknights', 
        bedtime: this.weeknightBedtime, 
        awake:  this.weeknightAwaketime
      },
      {
        offtime: 'Weekends', 
        bedtime: this.weekendBedtime, 
        awake:  this.weekendAwaketime
      }
    ];  
    console.log('Value of Josh page', this.offtimes);

    this.profileService.createProfile(this.offtimes).then(res=>{
        const temp = JSON.parse(JSON.stringify(res)).profileId;
          console.log('profileId from Profile Provider', temp);
          this.storage.set('profileId',temp);
          this.navCtrl.setRoot('StartPairingPage', {profileId: temp});
    }).catch(error => {
      console.log('Josh-bedtimes: Error While Creating Profile ', error);
    });
  }
   
  
}
