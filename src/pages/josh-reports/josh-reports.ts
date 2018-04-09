import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReportsProvider } from '../../providers/reports/reports/reports';

/**
 * Generated class for the JoshReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public reportService: ReportsProvider
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
    this.reportService.getReportForProfile(params).subscribe(
      data => {
        this.logReport = data;
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
}
