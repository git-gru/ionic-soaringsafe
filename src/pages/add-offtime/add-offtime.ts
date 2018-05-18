import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

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
  days = [];
  
  selectedDays: number[] = [];
    
  constructor(public navCtrl: NavController, public storage: Storage,
    public profileService: ProfileProvider, public dataService: DataProvider) {

  }

  ionViewDidLoad() {
    this.days = this.dataService.daysData();
    
    this.storage.get('profileData').then(res=>{
      this.profileId = res.profileId;
      console.log('profile Id: ', this.profileId);
    }).catch(error=> {
      console.log('Add-offtime: Error While getting profile Id from local storage');
      console.log(error);
    });
  }

  saveOfftimes() {
    let offtimes = {
      offtime: '',
      awake: '',
      bedtime: '',
      type: 'OFFTIME',
      days: []
    }
    offtimes.offtime = this.offtimeName;
    offtimes.awake = this.stopOfftime;
    offtimes.bedtime = this.startOfftime;
    offtimes.days = this.selectedDays

    console.log('Offtime Name: ', offtimes.offtime);
    console.log('startOfftime', offtimes.bedtime);
    console.log('Stop Offtimes', offtimes.awake);
    console.log('Selected Days', offtimes.days);

    console.log('Offtimes Data: ');
    console.log(offtimes);

    this.profileService.createNewOfftime(this.profileId, offtimes).then(res=>{
      console.log('Offtimes are added successfully');
      this.navCtrl.pop();
    }).catch(error => {
      console.log('AddOfftimePage: Error While updating the Offtimes in the firestore Collection');
      console.log(error);
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
    })
  }

}

