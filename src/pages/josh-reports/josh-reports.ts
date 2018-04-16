import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController, AlertController } from 'ionic-angular';
import { ReportsProvider } from '../../providers/reports/reports/reports';
import * as moment from 'moment-timezone';
import { InAppBrowserOptions, InAppBrowser } from '@ionic-native/in-app-browser';
import { ProfileProvider } from '../../providers/profile/profile';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: "page-josh-reports",
  templateUrl: "josh-reports.html"
})
export class JoshReportsPage {
  profileId: string;
  profileInfo: any;
  profilelog: string = "allowed";
  logReport: any = [];
  shownGroup = null;
  loader: any;
  customFilter = {
    url: '',
    status: '',
    action: '',
    expiration: 0,
    timestamp: undefined
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public reportService: ReportsProvider, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController,
    public iap: InAppBrowser, public profileService: ProfileProvider, public userService: UserProvider,
  ) {
    this.profileInfo = navParams.get("profileInfo");
    this.profileId = this.profileInfo.profileId;
    console.log('Pforile Id in Josh Report', this.profileId);
  }

  ionViewDidLoad() {
    console.log(this.profileId);
    //default type call
     this.changeType();
  }
  changeType() {
    //Pass profile id and querytype 
    var params: any = {};
    params.profileId = this.profileId;
    params.queryType = this.profilelog; 

    this.loader = this.loadingCtrl.create({
      content: 'Loading..'
    });
    this.loader.present();
    
    this.reportService.getReportForProfile(params).subscribe(
      data => {
        this.logReport = data;
        // data.forEach(res=>{
        //   let time =  moment(res.time).format();
        //   let tempObj = {
        //     time: time,
        //     fqdn: res.fqdn,
        //     domain: res.domain
        //   }
        //   this.logReport.push(tempObj);

          // console.log('Log Reports ', res.time); 
          // console.log('Formatted Time: ',time);
        // });
        this.loader.dismiss();
      },
      err => {}
    );
  }
  //For toogling full url
  toggleGroup(group) {  
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }
  isGroupShown(group) {
    return this.shownGroup === group;
  }

  openBlockedSheet(log) {
    console.log('Selected Log', log);
    let actionSheet = this.actionSheetCtrl.create({
      title: log.domain,
      buttons: [
        {
          text: 'Visit Website',
          handler: () => {
            console.log('Visit Website Selected');
            this.visitWebsite(log.domain);
          }
        },
        {
          text: 'Temporarily Allow',
          handler: () => {
            console.log('Temporarily Clicked');
            this.temporarilyAllow(log);
          }
        },
        {
          text: 'Always Allow',
          handler: () => {
            console.log('Always Clicked');
            this.changeStatus(log, 'ALLOW');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }

  openAllowedSheet(log) {
    console.log('Selected Log', log);
    let actionSheet = this.actionSheetCtrl.create({
      title: log.domain,
      buttons: [
        {
          text: 'Visit Website',
          handler: () => {
            console.log('Visit Website Selected');
            this.visitWebsite(log.domain);
          }
        },
        {
          text: 'Temporarily Block',
          handler: () => {
            console.log('Temporarily Clicked');
            this.temporarilyBlock(log);
          }
        },
        {
          text: 'Block',
          handler: () => {
            console.log('Always Clicked');
            this.changeStatus(log, 'BLOCK');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }

  visitWebsite(url) {
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    // Set the Target Browser
    const target = '_self';
    // const target = '_system';
    const browser = this.iap.create(url, target, options);
  }

  // Allow Temporarily
  temporarilyAllow(log) {
    const status = 'ALLOWED';
    const title = 'Temporarily Allow';
    this.temporarilyActionSheet(log, title, status);
  }

  //Block Temporarily
  temporarilyBlock(log) {
    const status = 'BLOCKED';
    const title = 'Temporarily Allow';
    this.temporarilyActionSheet(log, title, status);
  }

  // set Custom Filter Status Allow/Block
  changeStatus(log, status) { 
    const title = 'Site Allowed';
    const msg = `This site has been added as custom filter. It may up to 10 minutes for changes to show up on ${this.profileInfo.profileName} device`;
    this.customFilter.url = log.domain;
    this.customFilter.status = status;
    this.customFilter.expiration = 0;
    this.customFilter.action = 'enabled';
    this.customFilter.timestamp = this.userService.getUserTimestamp();

    console.log('profileId', this.profileId);
    // print the value of Custom Filter
    console.log('Custom Filters in JoshReports Page', this.customFilter);
    this.profileService.addNewCustomFilters(this.profileId, this.customFilter);
    this.showAlert(title, msg);
  }

  // Show Alerts
  showAlert(title, msg) {
    let alert = this.alertCtrl.create({
      title: title,
      message: msg, 
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            console.log('Okay clicked');
          }
        }
      ]
    });
    alert.present();
  }

  // Open ActionSheet for Temporary filters
  temporarilyActionSheet(log, title, status) {
    let actionSheet = this.actionSheetCtrl.create({
      title: title,
      buttons: [
        {
          text: '1 hour',
          handler: () => {
            console.log('Block 1 hour selected');
            this.setTemporaryFilter(log, 1, status);
          }
        },
        {
          text: '4 hour',
          handler: () => {
            console.log('Block 4 hour selected');
            this.setTemporaryFilter(log, 4, status);
          }
        },
        {
          text: '8 hour',
          handler: () => {
            console.log('Block 8 hour selected');
            this.setTemporaryFilter(log, 8, status);
          }
        },
        {
          text: '24 hour',
          handler: () => {
            console.log('Block 24 hour selected');
            this.setTemporaryFilter(log, 24, status);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }

  //Set temporarily filter in Firestore
  setTemporaryFilter(log, expiry, status) {
    const title = 'Site Temporarily Allowed';
    const msg = `This site has been added as custom filter for 24 hours. It may up to 10 minutes for changes to show up on ${this.profileInfo.profileName} device`;
    this.customFilter.url = log.domain;
    this.customFilter.status = status;
    this.customFilter.action = 'enabled';
    this.customFilter.expiration = expiry;
    this.customFilter.timestamp = this.userService.getUserTimestamp();

    console.log('profileId', this.profileId);
    // print the value of Custom Filter
    console.log('Custom Filters in JoshReports Page', this.customFilter);
    this.profileService.addNewCustomFilters(this.profileId, this.customFilter);
    this.showAlert(title, msg);
  }
}
 