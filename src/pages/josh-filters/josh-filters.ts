import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, Navbar, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/take';
import { FiltersProvider } from '../../providers/filters/filters';
import { ProfileProvider } from '../../providers/profile/profile';

declare let jQuery:any;

@IonicPage()
@Component({
  selector: 'page-josh-filters',
  templateUrl: 'josh-filters.html',
})
export class JoshFiltersPage {
  @ViewChild(Navbar) navBar: Navbar;

  profileInfo: any;
  profileName: any;
  profileId: string;
  appFilters = [];
  loader: any;
  categoryFilters = [];
  blockedAppFilters = [];
  customFilters = [];
  shownGroup = null;
  safetySecurity = [];
  ageGroup: any;
  newCustomFilter = [];
  toastMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage, public filterProvider: FiltersProvider, public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public profileService: ProfileProvider, public viewCtrl: ViewController) {

    this.storage.get('pName').then(res => {
      this.profileName = res;
      this.toastMessage = 'Filter settings have been updated. Changes may take up to 10 minutes to show on' + this.profileName + '\'s  devices';
    }).catch(error => {
      console.log('JoshDevices: Error while getting profileName', error);
    });

    this.profileInfo = navParams.get('profileInfo');
    console.log('profileInfo in JoshFiltersPage contructor', this.profileInfo);
    this.profileId = this.profileInfo.profileId;
     console.log('Safety And Security Array', this.safetySecurity);
    var vtoggle= setInterval(()=>{
      (<any>jQuery)('.toggle-jq').removeClass('toggle-md').removeClass('hidden').css({float:'right'});

     },500);
     setTimeout(()=>{

       clearInterval(vtoggle);

     },10000);
    this.getFilters();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoshFiltersPage');
    // this.navBar.backButtonClick = (e: UIEvent) => {
    //   this.goToProfile();
    // }
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
      if (this.appFilters[index].status == 'BLOCKED' && this.appFilters[index].buttonColor == '#FF4081') {
        this.appFilters[index].status = 'ALLOWED';
        this.appFilters[index].buttonColor = '#488aff';
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
        this.categoryFilters[index].buttonColor = '#488aff';
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
        this.customFilters[index].buttonColor = '#488aff';
      } else {
        this.customFilters[index].status = 'BLOCKED';
        this.customFilters[index].buttonColor = '#FF4081';
      }
    }
  }

  toggleSSFilters(index) {
    console.log('Selected Index ', index);

    if (index > -1) {
      console.log('clicked Item', this.safetySecurity[index]);

      // Check the Current Status of App and Change Accordingly
      if (this.safetySecurity[index].status == 'OFF' && this.safetySecurity[index].buttonColor == '#FF4081') {
        this.safetySecurity[index].status = 'ON';
        this.safetySecurity[index].buttonColor = '#488aff';
      } else {
        this.safetySecurity[index].status = 'OFF';
        this.safetySecurity[index].buttonColor = '#FF4081';
      }
    }
  }

  filterData(filters, flag) {
    console.log("entered filterdata() again with filters, flag", filters, flag);
    switch (flag) {
      case 'appFilters': {
        this.filterProvider.getProfileAppFilters(this.profileId).subscribe(res => {
          res.forEach(paf => {
            filters.filter(res => {
              if (res.filterId == JSON.parse(JSON.stringify(paf)).filterId) {
                res["status"] = JSON.parse(JSON.stringify(paf)).status;
                if (res.status == 'BLOCKED') {
                  res.buttonColor = '#FF4081';
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
                  res.buttonColor = '#FF4081';
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
    this.filterProvider.getProfileCutomFilters(this.profileId).then(res => {
      res.forEach(output => {
        this.customFilters = output;
        console.log('Custome Filters', output);
        this.customFilters.forEach(res => {
          if (res.status == 'BLOCKED') {
            res.buttonColor = '#FF4081';
          } else {
            res.buttonColor = '#488aff';
          }
        });
      });
    }, error => {
      console.log('Errors while Profile Custom Filters', error);
    });

    //Fetch Security and Safety from Profile Settings
    this.filterProvider.getProfileSafetySecurityFilters(this.profileId).then(res => {
      res.forEach(output => {
        //I THINK THERE IS SOMETHING ABOUT THESE TWO LINES THAT IS DUPLICATING THINGS
        this.safetySecurity = output;
        this.safetySecurity.forEach(res => {
          console.log('filterdata() inside Safety and security', res);
          if (res.status == 'ON') {
            res.buttonColor = '#488aff';
          } else {
            res.buttonColor = '#FF4081';
          }
          if (res.name === "youtubeRestricted") {
            res.displayName = "Filter YouTube Videos";
            res.helpInfo = "This enables Google's YouTube restricted mode which will filter out innappropriate videos on YouTube. Note that if you have blocked the YouTube App, this setting does not apply.";
          }
          if (res.name === "safeSearch") {
            res.displayName = "Filter Search Results";
            res.helpInfo = "This setting enables Google's SafeSearch mode which will filter out inappropriate image and web search results on Google and Bing. This means that innapropriate search results and image searches (according to Google) will be blocked. We recommend always having this on.";
          }

        });
      });
    }, error => {
      console.log('Errors while Profile Custom Filters', error);
    });
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
          data["buttonColor"] = '#488aff';
        }
        this.customFilters.push(data);
        this.newCustomFilter.push(data);

        console.log('Data coming from customeFilter in If', this.customFilters);
      } else {
        console.log('Data coming from customeFilter', this.customFilters);
      }
    });
    modal.present();
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
          data["buttonColor"] = '#488aff';
        }
        this.customFilters[index].url = data.url;
        this.customFilters[index].status = data.status;
        this.customFilters[index].buttonColor = data.buttonColor;

        console.log('Data coming from Edit customeFilter in If', this.customFilters);
      } else {
        this.profileService.deleteCustomFilter(this.profileId, this.customFilters[index]);
        this.customFilters.splice(index, 1);
        console.log('Custom filters after deleting the item', this.customFilters);
      }
    });
    modal.present();
  }

    //For toogling more information
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


  goToProfile() {
    this.loader = this.loadingCtrl.create({
      content: 'Saving...'
    });
    this.loader.present();

    let profile = {
      appFilters: [],
      categoryFilters: [],
      safeSearch: '',
      youtubeRestricted: '',
      customFilters: [],
      newCustomFilters: []
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
      console.log('custom filter', res);
      let temp = {
        url: res.url,
        status: res.status
      };
      profile.customFilters.push(temp);
    });

    //get the New Custom Filters
    this.newCustomFilter.forEach(res => {
      console.log('New Custom filter', res);
      let temp = {
        url: res.url,
        status: res.status
      };
      profile.newCustomFilters.push(temp);
    });

    console.log('profile', profile);

    // Set Profile Filter in Local Stoarge with Custome Filters
    this.storage.set('profileFilter', profile).then(res => {
      // this.navCtrl.push('SetInitialBedtimePage');
      console.log('Safety and Security Filters in JOsh Filter', this.safetySecurity);

      this.profileService.updateProfile(this.profileId).then(res => {
        this.loader.dismiss();
        if (res) {
          this.navCtrl.push('JoshPage', { profileInfo: this.profileInfo, toastMessage: this.toastMessage })
            .then(() => {

              const index = this.viewCtrl.index;

              for (let i = index; i > 0; i--) {
                this.navCtrl.remove(i);
              }
            }).catch(error => {
              console.log('Error While Poping a view', error);
            });
        }
        setTimeout(()=>{
          console.log('All the filters are updated now', res);
          this.profileService.updateFilterTriggers(this.profileId);
        }, 200);
      }).catch(error => {
        console.log('Error While Updating the Profile Filters', error);
      });
    });
  }

goToCancel() {
  this.navCtrl.push('JoshPage', { profileInfo: this.profileInfo, toastMessage: "Settings Cancelled" })
  .then(() => {

    const index = this.viewCtrl.index;

    for (let i = index; i > 0; i--) {
      this.navCtrl.remove(i);
    }
  }).catch(error => {
    console.log('Error While Poping a view', error);
  });

  }
}
