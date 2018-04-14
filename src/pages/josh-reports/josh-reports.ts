import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController } from 'ionic-angular';
import { ReportsProvider } from '../../providers/reports/reports/reports';
import * as moment from 'moment-timezone';

@IonicPage()
@Component({
  selector: "page-josh-reports",
  templateUrl: "josh-reports.html"
})
export class JoshReportsPage {
  profileId: string;
  profilelog: string = "allowed";
  logReport: any = [];
  shownGroup = null;
  loader: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public reportService: ReportsProvider,
    public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController
  ) {
    this.profileId = navParams.get("profileId");
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
        // this.logReport = data;
        data.forEach(res=>{
          let time =  moment(res.time).format();
          let tempObj = {
            time: time,
            fqdn: res.fqdn,
            domain: res.domain
          }
          this.logReport.push(tempObj);

          console.log('Log Reports ', res.time); 
          console.log('Formatted Time: ',time);
        });
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
            this.temporarilyAllow();
          }
        },
        {
          text: 'Always Allow',
          handler: () => {
            console.log('Always Clicked');
            this.alwaysAllow();
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

  }
  temporarilyAllow() {

  }
  alwaysAllow() {
    
  }
}
 