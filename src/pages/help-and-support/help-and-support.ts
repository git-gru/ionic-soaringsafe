import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelpProvider } from '../../providers/help/help';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-help-and-support',
  templateUrl: 'help-and-support.html',
})
export class HelpAndSupportPage {
  videoList = [];
  faqList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public helpProvider: HelpProvider, 
    public inAppBrowser: InAppBrowser) {
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
    // window.open(help.URL, '_blank');

    const url = help.URL;
    // const url = 'www.youtube.com';

    // const options = 'zoom = no, hardwareback = no, toolbarposition = top, location = yes, toolbar = yes, presentationstyle = pagesheet';

    let options: InAppBrowserOptions = {
      location: 'no',
      hidenavigationbuttons:'yes',
      toolbarposition: 'top',
      toolbarcolor: '#488aff',
      navigationbuttoncolor: '#ffffff',
      hideurlbar: 'yes',
      closebuttoncaption: 'close'
      };

    // Set the Target Browser
    // const target = '_self';
      const target = '_blank';
    //  const target = '_system';
     let browser = this.inAppBrowser.create('http://apache.org', target, options);
    //  browser.show();
    //  const browser = this.inAppBrowser.create(url, target, 'location = yes, presentationstyle = pagesheet, toolbarcolor = #488aff'); 
          
  }
}
