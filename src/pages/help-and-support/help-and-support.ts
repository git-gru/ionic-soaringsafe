import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelpProvider } from '../../providers/help/help';

@IonicPage()
@Component({
  selector: 'page-help-and-support',
  templateUrl: 'help-and-support.html',
})
export class HelpAndSupportPage {
  videoList = [];
  faqList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public helpProvider: HelpProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpAndSupportPage');

    this.helpProvider.getVideos().subscribe((res: any) => {
      //get and sort Video Data
      this.videoList = res.sort((a, b) => a.DisplayRank - b.DisplayRank);
    }, (error) => {
      console.log('errors', error);
    });

    this.helpProvider.getFAQs().subscribe((res: any) => {
      //get and sort FAQ Data
      this.faqList = res.sort((a, b) => a.DisplayRank - b.DisplayRank);
    }, (error) => {
      console.log('errors', error);
    });
  }

  goToURL(help){
    window.open(help.URL, '_blank');
    return false;
  }
}
