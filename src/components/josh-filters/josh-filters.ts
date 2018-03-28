import { Component, Input } from '@angular/core';
import { FiltersProvider } from '../../providers/filters/filters';

@Component({
  selector: 'josh-filters',
  templateUrl: 'josh-filters.html'
})
export class JoshFiltersComponent {

  // @Input('defaults') defaultFilters;

  appFilters = [];
  categoryFilters = [];
  blockedAppFilters = [];

  buttonColor: string = '#488aff';
  
  constructor(public filterProvider: FiltersProvider) {

    // console.log('default filters', this.defaultFilters);
    
    //Get all the filters Data
    this.getFilters();
  }

  // Get All Filters
  getFilters() {
    //Get Filters from Filter Provider
    this.filterProvider.getAppFilters().subscribe((res: any) => {
      //sort App Filter Data
      this.appFilters = res.sort((a, b) => a.displayRank - b.displayRank);

      this.appFilters.map(af => af["status"] = 'ALLOWED');
      console.log('App Filters', this.appFilters);
    }, (error) => {
      console.log('errors', error);
    });
    this.filterProvider.getCategoryFilters().subscribe((res: any) => {
      //sort Category Filters
      this.categoryFilters = res.sort((a, b) => a.displayRank - b.displayRank);

      this.categoryFilters.map(af => af["status"] = 'ALLOWED');
      console.log('Category Filters', this.appFilters);
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
      if (this.appFilters[index].status == 'BLOCKED') {
        this.appFilters[index].status = 'ALLOWED';
        this.buttonColor = '#488aff';
      } else {
        this.appFilters[index].status = 'BLOCKED';
        this.buttonColor = '#ff0000';
      }
    }
  }

  //Allow/Block Category Filters
  toggleCategoryFilters(index) {
    console.log('Selected Index ', index);

    if (index > -1) {
      console.log('clicked Item', this.categoryFilters[index]);

      // Check the Current Status of App and Change Accordingly
      if (this.categoryFilters[index].status == 'BLOCKED') {
        this.categoryFilters[index].status = 'ALLOWED';
        this.buttonColor = '#488aff';
      } else {
        this.categoryFilters[index].status = 'BLOCKED';
        this.buttonColor = '#ff0000';
      }
    }
  }
}
