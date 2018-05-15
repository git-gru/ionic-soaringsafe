import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserProvider } from '../providers/user/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  // rootPage: string = 'LoginToSoaringSafePage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public afAuth: AngularFireAuth, public userService: UserProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // Check If User is logged in or not
      this.afAuth.authState.subscribe(user=>{
        if(user) {
          userService.currentUserEmail = user.email
          //UPDATE 5/1/2018: Instead of tabs, opting for a single home screen for family page
          //this.rootPage = 'TabsControllerPage';
          this.rootPage = 'FamilyPage';
        } else {
          this.rootPage = 'WelcomeWizardPage'
        }
      });
    });
  }
}

