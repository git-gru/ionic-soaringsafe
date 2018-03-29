import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FiltersProvider } from '../../providers/filters/filters';

@Component({
  selector: 'josh-filters',
  templateUrl: 'josh-filters.html'
})
export class JoshFiltersComponent {

  // @Input('defaults') defaultFilters;
  @Input('age') ageG;

  appFilters = [];
  categoryFilters = [];
  blockedAppFilters = [];

  buttonColor: string = '#488aff';
  ageGroup = 'KID';
  
  constructor(public filterProvider: FiltersProvider, public navCtrl: NavController) {

    // console.log('default filters', this.defaultFilters);
    console.log('Age', this.ageGroup);
    
    //Get all the filters Data
    this.getFilters();
  }

  // Get All Filters
  getFilters() {
    //Get Filters from Filter Provider
    this.filterProvider.getAppFilters().subscribe((res: any) => {
      //sort App Filter Data
      this.appFilters = res.sort((a, b) => a.displayRank - b.displayRank);
     
      this.getAgeGroup(this.ageGroup, this.appFilters);
      console.log('App Filters', this.appFilters);

    }, (error) => {
      console.log('errors', error);
    });
    this.filterProvider.getCategoryFilters().subscribe((res: any) => {
      //sort Category Filters
      this.categoryFilters = res.sort((a, b) => a.displayRank - b.displayRank);
     
      this.getAgeGroup(this.ageGroup, this.categoryFilters);
     
      console.log('Category Filters', this.categoryFilters);
    }, (error) => {
      console.log('errors', error);
    });

  }

  //Allow/Block the app filters
  toggleAppFilters(index) {
    console.log('Selected Index ', index);

    if (index > -1) {
      console.log('clicked Item', this.appFilters[index]);

      // Check the Current Status of App and Change Accordingly
      if (this.appFilters[index].status == 'BLOCKED' && this.appFilters[index].buttonColor == '#ff0000') {
        this.appFilters[index].status = 'ALLOWED';
        this.appFilters[index].buttonColor = '#488aff';
      } else {
        this.appFilters[index].status = 'BLOCKED';
        this.appFilters[index].buttonColor = '#ff0000';
      }
    }
  }

  //Allow/Block Category Filters
  toggleCategoryFilters(index) {
    console.log('Selected Index ', index);

    if (index > -1) {
      console.log('clicked Item', this.categoryFilters[index]);

      // Check the Current Status of App and Change Accordingly
      if (this.categoryFilters[index].status == 'BLOCKED' && this.categoryFilters[index].buttonColor == '#ff0000') {
        this.categoryFilters[index].status = 'ALLOWED';
        this.categoryFilters[index].buttonColor = '#488aff';
      } else {
        this.categoryFilters[index].status = 'BLOCKED';
        this.categoryFilters[index].buttonColor = '#ff0000';
      }
    }
  }
  goToAddCustomFilter() {
    // Navigate to the AddCustomFilterPage
    this.navCtrl.push('AddCustomFilterPage');
  }
  getAgeGroup(ageGroup, filters) {
    switch(ageGroup) {
      case 'KID' : {
        filters.map(af => af["status"] = af.defaultKid);

        filters.forEach(res=>{

          if (res.status == 'BLOCKED') {
            filters.map(af => af["buttonColor"] =  '#488aff');
          } else {
            filters["buttonColor"] = '#ff0000';
          }
        });

        break;
      }
      case 'TEEN' : {
        filters.map(af => af["status"] = af.defaultTeen);
        break;
      }
      case 'YOUNG ADULT' : {
        filters.map(af => af["status"] = af.defaultYA);
        break;
      }
    }
  }
}
