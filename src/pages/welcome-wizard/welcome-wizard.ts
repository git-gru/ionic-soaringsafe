import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

/**
 * Generated class for the WelcomeWizardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome-wizard',
  templateUrl: 'welcome-wizard.html',
})
export class WelcomeWizardPage {
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeWizardPage');
  }

  nextSlide() {
    this.slides.slideNext(500);
  }

  exitWizard(endingSlide)
  {
    //Navigate to Signup page
    this.navCtrl.setRoot('SignupForSoaringSafePage');
  }
}
