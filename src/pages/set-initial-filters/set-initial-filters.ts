import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FiltersProvider } from '../../providers/filters/filters';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-set-initial-filters',
  templateUrl: 'set-initial-filters.html',
})   
export class SetInitialFiltersPage { 
  profileData = {};
  ageGroup:string = '';
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public filterProvider: FiltersProvider, public storage: Storage) {
    
    this.profileData = this.navParams.get('profileData');

    this.storage.set('profileData', this.profileData);
    
    console.log('profile Data', this.profileData);
    this.ageGroup = JSON.parse(JSON.stringify(this.profileData)).ageGroup;
    console.log('AgeGroup in SetInitialFilter', this.ageGroup);
 
    this.getFilters(this.ageGroup);      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetInitialFiltersPage');
  }
 
  getFilters(ageGroup) {
    //Get Default Filters According to AgeGroup Selected
    this.filterProvider.getDefaultFilters(ageGroup);
  }

}
