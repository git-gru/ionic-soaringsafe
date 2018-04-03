import { Component, Input } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { FiltersProvider } from '../../providers/filters/filters';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'josh-filters',
  templateUrl: 'josh-filters.html'
})
export class JoshFiltersComponent {

  // @Input('defaults') defaultFilters;
  @Input('age') ageGroup;
  customize: boolean = false;

  appFilters = [];
  categoryFilters = [];
  blockedAppFilters = [];
  customFilters = [];
  safetySecurity = [
    { name: 'Enforce Safesearch', status: 'ON', buttonColor: '#488aff' },
    { name: 'YouTube Restricted', status: 'OFF', buttonColor: '#ff0000' }
  ];
  // buttonColor: string = '#488aff';

  constructor(public filterProvider: FiltersProvider, public navCtrl: NavController,
    public modalCtrl: ModalController, public storage: Storage) {

    // console.log('default filters', this.defaultFilters);

    console.log('Safety And Security Array', this.safetySecurity);

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

  //ALLOW/BLOCK Custom Filters
  toggleCustomFilters(index) {
    console.log('Selected Index ', index);

    if (index > -1) {
      console.log('clicked Item', this.customFilters);

      // Check the Current Status of App and Change Accordingly
      if (this.customFilters[index].status == 'BLOCKED' && this.customFilters[index].buttonColor == '#ff0000') {
        this.customFilters[index].status = 'ALLOWED';
        this.customFilters[index].buttonColor = '#488aff';
      } else {
        this.customFilters[index].status = 'BLOCKED';
        this.customFilters[index].buttonColor = '#ff0000';
      }
    }
  }

  toggleSSFilters(index) {
    console.log('Selected Index ', index);

    if (index > -1) {
      console.log('clicked Item', this.customFilters);

      // Check the Current Status of App and Change Accordingly
      if (this.safetySecurity[index].status == 'OFF' && this.safetySecurity[index].buttonColor == '#ff0000') {
        this.safetySecurity[index].status = 'ON';
        this.safetySecurity[index].buttonColor = '#488aff';
      } else {
        this.safetySecurity[index].status = 'OFF';
        this.safetySecurity[index].buttonColor = '#ff0000';
      }
    }
  }

  //Add Custom Filters
  goToAddCustomFilter() {
    // Navigate to the AddCustomFilterPage
    let modal = this.modalCtrl.create('AddCustomFilterPage');

    modal.onDidDismiss(data => {
      if (data) {

        if (data.status == 'BLOCKED') {
          data["buttonColor"] = '#ff0000';
        } else {
          data["buttonColor"] = '#488aff';
        }
        this.customFilters.push(data);
        console.log('Data coming from customeFilter in If', this.customFilters);
      } else {
        console.log('Data coming from customeFilter', this.customFilters);
      }
    });
    modal.present();
    // this.navCtrl.push('AddCustomFilterPage');
  }

  //Set the filter according to the age group selected
  getAgeGroup(ageGroup, filters) {
    switch (ageGroup) {
      case 'KID': {
        filters.map(af => af["status"] = af.defaultKid);

        filters.forEach(res => {
          if (res.status == 'BLOCKED') {
            res.buttonColor = '#ff0000';
          } else {
            res.buttonColor = '#488aff';
          }
        });

        break;
      }
      case 'TEEN': {
        filters.map(af => af["status"] = af.defaultTeen);

        filters.forEach(res => {
          if (res.status == 'BLOCKED') {
            res.buttonColor = '#ff0000';
          } else {
            res.buttonColor = '#488aff';
          }
        });

        break;
      }
      case 'YOUNG ADULT': {
        filters.map(af => af["status"] = af.defaultYA);

        filters.forEach(res => {
          if (res.status == 'BLOCKED') {
            res.buttonColor = '#ff0000';
          } else {
            res.buttonColor = '#488aff';
          }
        });

        break;
      }
    }
  }

  goToSetInitialBedtime() {
    let profile = {
      appFilters: [],
      categoryFilters: [],
      safeSearch: '',
      youtubeRestricted: '',
      customFilters: []
    }
    if (this.customize) {
      //User have Enabled Custome Filters
      this.appFilters.forEach(res => {
        let temp = {
          filterId: res.filterId,
          status: res.status
        };
        profile.appFilters.push(temp);
      });

      //fetch the category filter
      this.categoryFilters.forEach(res => {
        let temp = {
          filterId: res.filterId,
          status: res.status
        };
        profile.categoryFilters.push(temp);
      });

      //get the Safe and Security Filter

      this.safetySecurity.forEach(res => {
        console.log('safeSearch', res);
        if (res.name == "Enforce Safesearch") {
          profile.safeSearch = res.status;
        } else {
          profile.youtubeRestricted = res.status;
        }
      });

      //get the Custom Filters
      this.customFilters.forEach(res => {
        console.log('custome filter', res);
        let temp = {
          url: res.url,
          status: res.status
        };
        profile.customFilters.push(temp);
      });

      console.log('profile', profile);

      // Set Profile Filter in Local Stoarge with Custome Filters
      this.storage.set('profileFilter', profile).then(res => {
        this.navCtrl.push('SetInitialBedtimePage');
      });

    } else {
      //User Have not selected Any Filter, proceed with default Filter
      this.appFilters.forEach(res => {
        let temp = {
          filterId: res.filterId,
          status: res.status
        };
        profile.appFilters.push(temp);
      });

      //fetch the category filter
      this.categoryFilters.forEach(res => {
        let temp = {
          filterId: res.filterId,
          status: res.status
        };
        profile.categoryFilters.push(temp);
      });
      
      //Fetch safety and Security
      this.safetySecurity.forEach(res => {
        console.log('safeSearch', res);
        if (res.name == "Enforce Safesearch") {
          profile.safeSearch = res.status;
        } else {
          profile.youtubeRestricted = res.status;
        }
      });
      console.log('profile', profile);
      //Set Profile Filter in Local Storage with Default Filters
      this.storage.set('profileFilter', profile).then(res => {
        this.navCtrl.push('SetInitialBedtimePage');
      });
    }
  }
}
