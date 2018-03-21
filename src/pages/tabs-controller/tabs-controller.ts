import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html',
})
export class TabsControllerPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = 'FamilyPage';
  tab2Root: any = 'ReportsPage';
  tab3Root: any = 'AccountPage';
  tab4Root: any = 'HelpAndSupportPage';
  constructor(public navCtrl: NavController) {
  }
  
}
