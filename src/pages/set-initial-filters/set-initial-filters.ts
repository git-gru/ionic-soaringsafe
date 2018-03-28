import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FiltersProvider } from '../../providers/filters/filters';

@IonicPage()
@Component({
  selector: 'page-set-initial-filters',
  templateUrl: 'set-initial-filters.html',
})  
export class SetInitialFiltersPage {
  profileData = {};
  customize: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public filterProvider: FiltersProvider) {
    
    this.profileData = this.navParams.get('profileData');

    console.log('profile Data', this.profileData);
    const ageGroup = JSON.parse(JSON.stringify(this.profileData)).ageGroup;

    this.getFilters(ageGroup);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetInitialFiltersPage');
  }

  getFilters(ageGroup) {
    //Get Default Filters According to AgeGroup Selected
    this.filterProvider.getDefaultFilters(ageGroup);
  }

  goToSetInitialBedtime() {
    // Navigate to the SetInitialBedtimePage
    this.navCtrl.push('SetInitialBedtimePage');
  }
}
