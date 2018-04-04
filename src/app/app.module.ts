import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FormsModule } from '@angular/forms';
import { MyApp } from './app.component';
import { firebaseConfig } from './firebase.credential';
import { IonicStorageModule } from '@ionic/storage';
import { UserProvider } from '../providers/user/user';
import { GooglePlus } from '@ionic-native/google-plus';
import { DataProvider } from '../providers/data/data';
import { FiltersProvider } from '../providers/filters/filters';
import { HelpProvider } from '../providers/help/help';
import { ProfileProvider } from '../providers/profile/profile';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    AngularFireAuthModule,
    AngularFirestoreModule,
    IonicModule.forRoot(MyApp, {swipeBackEnabled:false}),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    GooglePlus,
    DataProvider,
    FiltersProvider,
    ProfileProvider,
    InAppBrowser,
    HelpProvider,
  ]
})
export class AppModule {}
