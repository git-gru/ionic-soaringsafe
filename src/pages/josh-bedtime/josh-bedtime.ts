import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ProfileProvider } from '../../providers/profile/profile';


@IonicPage()
@Component({
  selector: 'page-josh-bedtime',
  templateUrl: 'josh-bedtime.html',
})
export class JoshBedtimePage {
  @ViewChild(Navbar) navBar: Navbar;

  profileId: string = '';
  weeknightBedtime:string = '';
  weeknightAwaketime:string = '';
  weekendBedtime: string = '';
  weekendAwaketime: string = '';
  bedtimes = [];
  offtimes = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: DataProvider,
    public profileService: ProfileProvider) {
    this.profileId = navParams.get('profileId');
    this.dataService.getBedtimes(this.profileId).subscribe(res=>{
      // console.log('Bedtimes ', res);
      res.forEach(result=>{
        this.bedtimes.push(result);
      });
      console.log('Bedtimes', this.bedtimes);
      this.bedtimes.filter(bt => {
        if(bt.offtime == 'Weeknights') {
          this.weeknightBedtime = bt.bedtime;
          this.weeknightAwaketime = bt.awake;
        } else {
          this.weekendBedtime = bt.bedtime;
          this.weekendAwaketime = bt.awake;
        }
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoshBedtimePage');
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.updateBedtimes();
    }
  }
  //Update the Bedtimes in profileSettings in firestore
  updateBedtimes() {
    console.log('value of WeeknightBed Time', this.weeknightBedtime);
    console.log('value of WeeknightAwake Time', this.weeknightAwaketime);
    console.log('value of WeekEndBed Time', this.weekendBedtime);
    console.log('value of WeekendAwake Time', this.weekendAwaketime);

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

    this.profileService.updateBedtimes(this.offtimes, this.profileId).then(res=>{
      this.navCtrl.pop();
    }).catch(error => {
      console.log('Josh-bedtimes: Error While Updating Bedtimes ', error);
    });
  }
   

}
