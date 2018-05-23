import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProfileProvider } from '../../providers/profile/profile';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-josh-offtime',
  templateUrl: 'josh-offtime.html',
})
export class JoshOfftimePage {

  profileName: string = '';
  profileId: string = '';
  offtimes = [];
  serverOfftimes = [];
  changedOfftimes = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
    public profileService: ProfileProvider) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoshOfftimePage');
    
  }

  ionViewWillEnter() {
    this.changedOfftimes = [];
    
    this.storage.get('profileData').then(res => {
      this.profileName = res.profileName;
      this.profileId = res.profileId;
      //Get Offtimes Data    
      this.getOfftimeData();
    }).catch(error => {
      console.log('JoshOfftime: Error while getting profileName', error);
    });
  }

  getOfftimeData() {
    this.profileService.getOfftimes(this.profileId).take(1).subscribe(off => {
      this.offtimes = [];
      this.serverOfftimes = [];
      off.forEach(res => {
        // console.log('Offtime Data');
        // console.log(res);

        if (JSON.parse(JSON.stringify(res)).type == 'OFFTIME') {
          this.serverOfftimes.push(res);
          this.convertOfftimes(res);
          return;
        }

      });
    }, error => {
      console.log('JoshOfftimesPage: Error While getting Offtime Data');
      console.log(error);
    });
  }

  convertOfftimes(offtimes) {
    let temp = JSON.parse(JSON.stringify(offtimes));

    let daysNameArray = this.getDaysName(temp.days);

    let awakeIndex = Number(temp.awake);
    let bedtimeIndex = Number(temp.bedtime);

    console.log('awake time: ');
    console.log(awakeIndex);
    console.log(bedtimeIndex);

    let awakeTime = this.indexToTime(awakeIndex);
    let bedtime = this.indexToTime(bedtimeIndex);
    
    // console.log('Awake into Time: ');
    // console.log(awakeTime);
    // console.log(bedtime);
    // console.log('DaysNameArray');
    // console.log(daysNameArray);

    let offObj = {
      name: temp.offtime,
      days: daysNameArray,
      enabled: temp.enabled,
      offtime: `${awakeTime} - ${bedtime}`
    }

    this.offtimes.push(offObj);

    console.log('final Data: ');
    console.log(this.offtimes);
  }
  indexToTime(index) {
    return moment("2010-10-20 0:00", "YYYY-MM-DD HH:mm").add(15 * index, 'minutes').format('LT');
  } 

  getDaysName(daysArray) {
    let daysName = '';
    daysArray.forEach(res => {
      console.log('Days Number', res);

      switch (res) {
        case 1: {
          if (daysName == '') {
            daysName = 'M';
            return;
          }
          daysName = daysName + ', ' + 'M';
          break;
        }
        case 2: {
          if (daysName == '') {
            daysName = 'T';
            return;
          }
          daysName = daysName + ', ' + 'T';
          break;
        }
        case 3: {
          if (daysName == '') {
            daysName = 'W';
            return;
          }
          daysName = daysName + ', ' + 'W';
          break;
        }
        case 4: {
          if (daysName == '') {
            daysName = 'Th';
            return;
          }
          daysName = daysName + ', ' + 'Th';
          break;
        }
        case 5: {
          if (daysName == '') {
            daysName = 'F';
            return
          }
          daysName = daysName + ', ' + 'F';
          break;
        }
        case 6: {
          if (daysName == '') {
            daysName = 'Sa';
            return;
          }
          daysName = daysName + ', ' + 'Sa';
          break;
        }
        case 7: {
          if (daysName == '') {
            daysName = 'Su';
            return;
          }
          daysName = daysName + ', ' + 'Su';
          break;
        }
      }

    });

    return daysName;
  }

  goToAddOfftime(offtime, index) {
    const selectedOfftime = this.serverOfftimes[index];
    console.log('Selected offtime for Editing', offtime);
    console.log('Selected Offtime inside Server Offtime');
    console.log(this.serverOfftimes[index]);
    // Navigate to the AddOfftimePage
     this.navCtrl.push('AddOfftimePage', {offtime: selectedOfftime});
  }
  
  changeStatus(index, event) {
        
    this.serverOfftimes[index].enabled = event.checked;

    console.log(this.serverOfftimes[index]);
    
    const offtimeUid = this.serverOfftimes[index].offtimeUID;
    const offtimeupdate = {
      enabled: this.serverOfftimes[index].enabled
    }

    this.profileService.updateOfftimeInFirestore(offtimeUid, this.profileId, offtimeupdate).then(() => {
      console.log('JoshOfftime: offtime status upadated successfully');
    }).catch(error => {
      console.log('JoshOfftime: Error while updating the offtime status ', error);
    });
        
  }
}
