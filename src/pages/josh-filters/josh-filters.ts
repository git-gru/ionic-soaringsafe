import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/take';
import { FiltersProvider } from '../../providers/filters/filters';
import { ProfileProvider } from '../../providers/profile/profile';


@IonicPage()
@Component({
  selector: 'page-josh-filters',
  templateUrl: 'josh-filters.html',
})
export class JoshFiltersPage {

  profileName: any;
  profileId: string;
  appFilters = [];
  categoryFilters = [];
  blockedAppFilters = [];
  customFilters = [];
  safetySecurity = [ ];
  ageGroup: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage, public filterProvider: FiltersProvider, public modalCtrl: ModalController,
    public profileService: ProfileProvider) {

    this.storage.get('pName').then(res => {
      this.profileName = res;
    }).catch(error => {
      console.log('JoshDevices: Error while getting profileName', error);
    });

    this.profileId = navParams.get('profileId');

    this.getFilters();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoshFiltersPage');
  }

  // Get All Filters 
  getFilters() {
    let tempAppFilter = [];
    //Get Filters from Filter Provider
    this.filterProvider.getAppFilters().subscribe((res: any) => {
      //sort App Filter Data
      this.appFilters = res.sort((a, b) => a.displayRank - b.displayRank);

      this.filterData(this.appFilters, 'appFilters');
    }, (error) => {
      console.log('errors', error);
    });

    this.filterProvider.getCategoryFilters().subscribe((res: any) => {
      //sort Category Filters
      this.categoryFilters = res.sort((a, b) => a.displayRank - b.displayRank);

      // this.getAgeGroup(this.ageGroup, this.categoryFilters);
      this.filterData(this.categoryFilters, 'categoryFilters');
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
      console.log('clicked Item', this.safetySecurity[index]);

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

  filterData(filters, flag) {
    switch (flag) {
      case 'appFilters': {
        this.filterProvider.getProfileAppFilters(this.profileId).subscribe(res => {
          res.forEach(paf => {
            filters.filter(res => {
              if (res.filterId == JSON.parse(JSON.stringify(paf)).filterId) {
                res["status"] = JSON.parse(JSON.stringify(paf)).status;
                if (res.status == 'BLOCKED') {
                  res.buttonColor = '#ff0000';
                } else {
                  res.buttonColor = '#488aff';
                }
              } 
            });
          });
          console.log('App Filters', filters);
        }, error => {
          console.log('Errors While getting ProfileAppFilter ', error);
        });
        break;
      }
      case 'categoryFilters': {
        this.filterProvider.getProfileCategoryFilters(this.profileId).subscribe(res => {
          res.forEach(pcf => {
            filters.filter(res => {
              if (res.filterId == JSON.parse(JSON.stringify(pcf)).filterId) {
                res["status"] = JSON.parse(JSON.stringify(pcf)).status;
                if (res.status == 'BLOCKED') {
                  res.buttonColor = '#ff0000';
                } else {
                  res.buttonColor = '#488aff';
                }
              } 
            });
          });
            console.log('Profile Category filter', filters);
        }, error => {
          console.log('Errors While getting ProfileAppFilter ', error);
        });
        break;
      }
    } 
    
    // Fetch Custome filters from ProfileSettings
      this.filterProvider.getProfileCutomFilters(this.profileId).then(res=>{
      res.forEach(output=> {
        this.customFilters = output;
        console.log('Custome Filters', output);
        this.customFilters.forEach(res=>{
          if (res.status == 'BLOCKED') {
            res.buttonColor = '#ff0000';
          } else {
            res.buttonColor = '#488aff';
          }
        });
      });
    }, error=>{
      console.log('Errors while Profile Custom Filters', error);
    });

    //Fetch Security and Safety from Profile Settings
    this.filterProvider.getProfileSafetySecurityFilters(this.profileId).then(res=>{
      res.forEach(output=> {
      this.safetySecurity = output;  
      this.safetySecurity.forEach(res=>{
        console.log('inside Safety and security', res.status);
        if (res.status == 'ON') {
          res.buttonColor = '#488aff';
        } else {
          res.buttonColor = '#ff0000';
        }
      });
      });
    }, error=>{
      console.log('Errors while Profile Custom Filters', error);
    });
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

  goToSetInitialBedtime() {
    let profile = {
      appFilters: [],
      categoryFilters: [],
      safeSearch: '',
      youtubeRestricted: '',
      customFilters: []
    }
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
      // console.log('safeSearch', res);
      if (res.name == "safeSearch") {
        profile.safeSearch = res.status;
        console.log('profile status of ssf in if', profile.safeSearch);
      } else {
        profile.youtubeRestricted = res.status;
        console.log('profile status of ssf in else', profile.youtubeRestricted);
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
      // this.navCtrl.push('SetInitialBedtimePage');
      console.log('Safety and Security Filters in JOsh Filter', this.safetySecurity);
      this.profileService.updateProfile(this.profileId);
    });
  }
}
