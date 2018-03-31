import { Component } from '@angular/core';


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

  constructor() {
    console.log('Hello JoshBedtimeComponent Component');

    
  }
   // {
    //   offtime: '',
    //   bedtime: '',
    //   awake: '',  
    // }
  
  createProfile() {
    console.log('value of WeeknightBed Time', this.weeknightBedtime);
    console.log('value of WeeknightAwake Time', this.weeknightAwaketime);
    console.log('value of WeekEndBed Time', this.weekendBedtime);
    console.log('value of WeekendAwake Time', this.weekendAwaketime);
  }
}
