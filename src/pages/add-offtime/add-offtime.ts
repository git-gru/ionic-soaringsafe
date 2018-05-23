import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { JoshOfftimePage } from '../josh-offtime/josh-offtime';
import { Storage } from '@ionic/storage';
import { ProfileProvider } from '../../providers/profile/profile';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-add-offtime',
  templateUrl: 'add-offtime.html',
})
export class AddOfftimePage {

  offtimeName: string = '';
  startOfftime: string = '';
  stopOfftime: string = '';
  profileId: string;
  offtimeUid: string;
  days = [];
  isCancel:boolean = true;
  isSave: boolean = true;
  status:boolean =  true;
  
  selectedDays: number[] = [];
  offtimes = {
    offtime: '',
    awake: '',
    bedtime: '',
    enabled: true,
    type: 'OFFTIME',
    days: [],
    offtimeUID: ''
  }
    
  constructor(public navCtrl: NavController, public navParams:NavParams, public storage: Storage,
    public profileService: ProfileProvider, public dataService: DataProvider) {
  }

  ionViewDidLoad() { 
    const temp = this.navParams.get('offtime');
    this.days = this.dataService.daysData();

    if(temp !=undefined && temp != null) {
      this.initializeOfftimes(temp);
    }
    
    this.storage.get('profileData').then(res=>{
      this.profileId = res.profileId;
      console.log('profile Id: ', this.profileId);
    }).catch(error=> {
      console.log('Add-offtime: Error While getting profile Id from local storage');
      console.log(error);
    });
  }
  initializeOfftimes(selectedOfftime) {
      this.isCancel = false;
      this.isSave = false;

      this.startOfftime = selectedOfftime.bedtime;
      this.stopOfftime = selectedOfftime.awake;
      this.offtimeName = selectedOfftime.offtime;
      this.selectedDays = selectedOfftime.days;
      this.offtimeUid = selectedOfftime.offtimeUID;
      this.status = selectedOfftime.enabled;

      // console.log('Selected days');
      // console.log(this.selectedDays);

      this.days.filter(res=> {
      
        for(let i = 0; i<this.selectedDays.length; i++) {
          if(res.dayName == this.getDaysName(this.selectedDays[i])) {
            console.log('matched', res);
            res.isSelected = true;
            res.buttonColor = '#488aff';
          }
        }
      });
  }

  saveOfftimes() {
    // let offtimes = {
    //   offtime: '',
    //   awake: '',
    //   bedtime: '',
    //   enabled: true,
    //   type: 'OFFTIME',
    //   days: []
    // }
    this.offtimes.offtime = this.offtimeName;
    this.offtimes.awake = this.stopOfftime;
    this.offtimes.bedtime = this.startOfftime;
    this.offtimes.days = this.selectedDays

    console.log('Offtime Name: ', this.offtimes.offtime);
    console.log('startOfftime', this.offtimes.bedtime);
    console.log('Stop Offtimes', this.offtimes.awake);
    console.log('Selected Days', this.offtimes.days);

    console.log('Offtimes Data: ');
    console.log(this.offtimes);

    this.profileService.createNewOfftime(this.profileId, this.offtimes).then(res=>{
      console.log(res);
      console.log('Offtimes are added successfully');
      
      const offtimeUid = res.id;

      const offtimeData = {
        offtimeUID: offtimeUid
      };

      this.profileService.updateOfftimeInFirestore(offtimeUid, this.profileId, offtimeData).then(() => {
        console.log('offtimeUID updated successfully');
      }).catch(error=> {
        console.log('Error While updating the offtimeUid in firestore', error);
      });

      this.navCtrl.pop();

    }).catch(error => {
      console.log('AddOfftimePage: Error While updating the Offtimes in the firestore Collection');
      console.log(error);
    });
  }
  
  updateOfftime() {

    this.offtimes.offtime = this.offtimeName;
    this.offtimes.awake = this.stopOfftime;
    this.offtimes.bedtime = this.startOfftime;
    this.offtimes.days = this.selectedDays
    this.offtimes.offtimeUID = this.offtimeUid;
    this.offtimes.enabled = this.status;

    console.log('Offtimes Data: ');
    console.log(this.offtimes);

    this.profileService.updateOfftimeInFirestore(this.offtimeUid, this.profileId, this.offtimes).then(res => {
      console.log('Offtimes are updated Successfully');
      console.log(res);

      this.navCtrl.pop();
    }).catch(error => {
      console.log('AddOfftimes: Error while updating offtimes in Firestore', error);
    });
  }

  selectDay(day, index) {
    console.log(`${day} Clicked`);
    console.log('Clicked Item index', index);
    console.log('Selected Days', this.selectedDays);


    if(this.days[index].isSelected) {
      this.days[index].buttonColor = '#f4f4f4';
      this.days[index].isSelected = false;
      this.createDaysArray(day.dayName, 'remove');
    } else {
      this.days[index].buttonColor = '#488aff';
      this.days[index].isSelected = true;
      this.createDaysArray(day.dayName, 'add');
    }
  }

  createDaysArray(day, op) {
    switch(day) {
      case 'Su' : {
        if(op == 'add') {
          this.addDay(7);
        } else {
          this.removeDay(7)
        }
        break;
      }
      case 'M' : {
        if(op == 'add') {
          this.addDay(1);
        } else {
          this.removeDay(1)
        }
        break;
      }
      case 'T' : {

        if(op == 'add') {
          this.addDay(2);
        } else {
          this.removeDay(2)
        }

        break;
      }
      case 'W' : {
        if(op == 'add') {
          this.addDay(3);
        } else {
          this.removeDay(3)
        }
        break;
      }
      case 'Th' : {
        if(op == 'add') {
          this.addDay(4);
        } else {
          this.removeDay(4)
        }
        break;
      }
      case 'F' : {
        if(op == 'add') {
          this.addDay(5);
        } else {
          this.removeDay(5)
        }
        
        break;
      }
      case 'Sa' : {
        if(op == 'add') {
          this.addDay(6);
        } else {
          this.removeDay(6)
        }
        break;
      }
    }
  }

  addDay(dn) {
    this.selectedDays.push(dn);
  }

  removeDay(dn) {
    this.selectedDays.filter(res=>{
      if(res == dn) {
        let index = this.selectedDays.indexOf(res);
        console.log('value', index);
        this.selectedDays.splice(index, 1);
      }
    });
  }

  deleteOfftime() {
    this.profileService.deleteOfftimeFromDB(this.offtimeUid, this.profileId).then(() => {
      console.log('Offtime Deleted Successfully');
      this.navCtrl.pop();
    }).catch(error => {
      console.log('AddOfftime: Error while deleting offtime', error);
    });
  }
  cancelOfftime() {
    this.navCtrl.pop();
  }
  getDaysName(dayNumber) {
    
    let selectedDayName = '';
      switch(dayNumber) {
        case 1 : {
          selectedDayName = 'M';
          break;
        }
        case 2 : {
          selectedDayName = 'T';
          break;
        }
        case 3 : {
  
          selectedDayName = 'W';
  
          break;
        }
        case 4 : {
          selectedDayName = 'Th';

          break;
        }
        case 5 : {
          selectedDayName = 'F';
          break;
        }
        case 6 : {
          selectedDayName = 'Sa';
          
          break;
        }
        case 7 : {
          selectedDayName = 'Su';
          break;
        }
      }
      return selectedDayName;
  }
}

