import { Component } from '@angular/core';
import { ProfileProvider } from '../../providers/profile/profile';


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

  constructor(public profileService: ProfileProvider) {
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

    this.profileService.createProfile(this.offtimes);
  }
   
  
}
