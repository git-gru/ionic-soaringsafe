import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReportsProvider } from '../../providers/reports/reports/reports';

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {
  user = {};
  allTimeReport = {};
  todayReport = {};
  weekReport = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,  public reportService : ReportsProvider ) {
    this.getAllReports();
  }

  ionViewDidLoad() {
   }

  // get all the reports of the user.
  getAllReports() {
    //report service call for fetch report data
    this.reportService.getReportData().subscribe(data => {
      this.allTimeReport = data.alltime;
      this.todayReport = data.today;
      this.weekReport = data.week;
    }, err => {     
    });
  }
}
