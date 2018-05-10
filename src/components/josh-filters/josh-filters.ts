import { Component, Input } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { FiltersProvider } from '../../providers/filters/filters';
import { Storage } from '@ionic/storage';
// import $ from "jquery";
//var $=window.jQuery;
@Component({
  selector: 'josh-filters',
  templateUrl: 'josh-filters.html'
})
export class JoshFiltersComponent {

  // @Input('defaults') defaultFilters;
  @Input('age') ageGroup;
  customize: boolean = false;

  appFilters = [];
  shownGroup = null;
  categoryFilters = [];
  blockedAppFilters = [];
  customFilters = [];
  safetySecurity = [
    { name: "safeSearch", displayName: 'Filter Search Results', status: 'ON', buttonColor: '#2196F3', helpInfo: "This setting enables Google's SafeSearch mode which will filter out innappropriate image and web search results on Google and Bing. This means that innapropriate search results and image searches (according to Google) will be blocked. We recommend always having this on." },
    { name: "youtubeRestricted", displayName: 'Filter YouTube Videos', status: 'OFF', buttonColor: '#FF4081', helpInfo: "This enables Google's YouTube restricted mode which will filter out innappropriate videos on YouTube. Note that if you have blocked the YouTube App, this setting does not apply." }
  ];
  // buttonColor: string = '#2196F3';

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
  toggleFilters(){
      if(this.customize){
        this.customize=false;
      }
      else{
        this.customize=true;
      }

  }
  //Allow/Block the app filters
  toggleAppFilters(index) {
    console.log('Selected Index ', index);

    if (index > -1) {
      console.log('clicked Item', this.appFilters[index]);

      // Check the Current Status of App and Change Accordingly
      if (this.appFilters[index].status == 'BLOCKED' && this.appFilters[index].buttonColor == '#FF4081') {
        this.appFilters[index].status = 'ALLOWED';
        this.appFilters[index].buttonColor = '#2196F3';
      } else {
        this.appFilters[index].status = 'BLOCKED';
        this.appFilters[index].buttonColor = '#FF4081';
      }
    }
  }

  //Allow/Block Category Filters
  toggleCategoryFilters(index) {
    console.log('Selected Index ', index);

    if (index > -1) {
      console.log('clicked Item', this.categoryFilters[index]);

      // Check the Current Status of App and Change Accordingly
      if (this.categoryFilters[index].status == 'BLOCKED' && this.categoryFilters[index].buttonColor == '#FF4081') {
        this.categoryFilters[index].status = 'ALLOWED';
        this.categoryFilters[index].buttonColor = '#2196F3';
      } else {
        this.categoryFilters[index].status = 'BLOCKED';
        this.categoryFilters[index].buttonColor = '#FF4081';
      }
    }
  }

  //ALLOW/BLOCK Custom Filters
  toggleCustomFilters(index) {
    console.log('Selected Index ', index);

    if (index > -1) {
      console.log('clicked Item', this.customFilters);

      // Check the Current Status of App and Change Accordingly
      if (this.customFilters[index].status == 'BLOCKED' && this.customFilters[index].buttonColor == '#FF4081') {
        this.customFilters[index].status = 'ALLOWED';
        this.customFilters[index].buttonColor = '#2196F3';
      } else {
        this.customFilters[index].status = 'BLOCKED';
        this.customFilters[index].buttonColor = '#FF4081';
      }
    }
  }

  toggleSSFilters(index) {
    console.log('Selected Index ', index);

    if (index > -1) {
      console.log('clicked Item', this.customFilters);

      // Check the Current Status of App and Change Accordingly
      if (this.safetySecurity[index].status == 'OFF' && this.safetySecurity[index].buttonColor == '#FF4081') {
        this.safetySecurity[index].status = 'ON';
        this.safetySecurity[index].buttonColor = '#2196F3';
      } else {
        this.safetySecurity[index].status = 'OFF';
        this.safetySecurity[index].buttonColor = '#FF4081';
      }
    }
  }

  //Add Custom Filters
  goToAddCustomFilter() {
    const cf = {};
    // Navigate to the AddCustomFilterPage
    let modal = this.modalCtrl.create('AddCustomFilterPage', {customFilter: cf});

    modal.onDidDismiss(data => {
      if (data) {

        if (data.status == 'BLOCKED') {
          data["buttonColor"] = '#FF4081';
        } else {
          data["buttonColor"] = '#2196F3';
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

  editCustomFilter(index) {
    console.log('Custom Filter', this.customFilters[index]);
    let temp = this.customFilters[index];
    let modal = this.modalCtrl.create('AddCustomFilterPage', {customFilter: temp});

    modal.onDidDismiss(data => {
      if (data) {
        if (data.status == 'BLOCKED') {
          data["buttonColor"] = '#FF4081';
        } else {
          data["buttonColor"] = '#2196F3';
        }
        this.customFilters[index].url = data.url;
        this.customFilters[index].status = data.status;
        this.customFilters[index].buttonColor = data.buttonColor;

        console.log('Data coming from Edit customeFilter in If', this.customFilters);
      } else {
        //this line not needed in initial setup: this.profileService.deleteCustomFilter(this.profileId, this.customFilters[index]);
        this.customFilters.splice(index, 1);
        console.log('Custom filters after deleting the item', this.customFilters);
      }
    });
    modal.present();
  }

  //Set the filter according to the age group selected
  getAgeGroup(ageGroup, filters) {
    switch (ageGroup) {
      case 'KID': {
        filters.map(af => af["status"] = af.defaultKid);

        filters.forEach(res => {
          if (res.status == 'BLOCKED') {
            res.buttonColor = '#FF4081';
          } else {
            res.buttonColor = '#2196F3';
          }
        });

        break;
      }
      case 'TEEN': {
        filters.map(af => af["status"] = af.defaultTeen);

        filters.forEach(res => {
          if (res.status == 'BLOCKED') {
            res.buttonColor = '#FF4081';
          } else {
            res.buttonColor = '#2196F3';
          }
        });

        break;
      }
      case 'YOUNG ADULT': {
        filters.map(af => af["status"] = af.defaultYA);

        filters.forEach(res => {
          if (res.status == 'BLOCKED') {
            res.buttonColor = '#FF4081';
          } else {
            res.buttonColor = '#2196F3';
          }
        });

        break;
      }
    }
  }

   //For toogling showing more information
   toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }
  isGroupShown(group) {
    return this.shownGroup === group;
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
      //User have Enabled Custome Filters, fetch and save
      this.appFilters.forEach(res => {
        let temp = {
          filterId: res.filterId,
          status: res.status
        };
        profile.appFilters.push(temp);
      });

      //fetch and save the category filters
      this.categoryFilters.forEach(res => {
        let temp = {
          filterId: res.filterId,
          status: res.status
        };
        profile.categoryFilters.push(temp);
      });

      //fetch and save the Safety and Security Filter
      this.safetySecurity.forEach(res => {
        console.log('safeSearch', res);
        if (res.name == "safeSearch") {
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
        console.log('Safety and Security:', res);
        if (res.name == "safeSearch") {
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
