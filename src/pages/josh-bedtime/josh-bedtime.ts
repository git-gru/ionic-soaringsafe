import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ProfileProvider } from '../../providers/profile/profile';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';


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
  isEnabled:boolean;
  profileName: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: DataProvider,
    public profileService: ProfileProvider, public userService: UserProvider, public storage: Storage) {
    
      this.storage.get('pName').then(res => {
        this.profileName = res;
      }).catch(error => { 
        console.log('JoshOfftime: Error while getting profileName', error);
      });
    
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
          this.isEnabled = bt.enabled;
        } else {
          this.weekendBedtime = bt.bedtime;
          this.weekendAwaketime = bt.awake; 
          this.isEnabled = bt.enabled;
        }
      });
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
    console.log('Value of isEnabled or not', this.isEnabled);

    this.offtimes = [
      {
        offtime: 'Weeknights', 
        bedtime: this.weeknightBedtime, 
        awake:  this.weeknightAwaketime,
        isEnabled: this.isEnabled
      },
      {
        offtime: 'Weekends', 
        bedtime: this.weekendBedtime, 
        awake:  this.weekendAwaketime,
        isEnabled: this.isEnabled
      }
    ];  
    console.log('Offtimes', this.offtimes);
    
    this.profileService.updateBedtimes(this.offtimes, this.profileId).then(res=>{
      setTimeout(()=> {
        if(res){
          console.log('Bedtimes are successfully updated');   
          this.profileService.updateOfftimeTriggers(this.profileId);     
          }
      }, 300); 
      this.navCtrl.pop();
    }).catch(error => {
      console.log('Josh-bedtimes: Error While Updating Bedtimes ', error);
    });
  }
   

}
