import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstallationSuccessfulPage } from './installation-successful';

@NgModule({
  declarations: [
    InstallationSuccessfulPage,
  ],
  imports: [
    IonicPageModule.forChild(InstallationSuccessfulPage),
  ],
})
export class InstallationSuccessfulPageModule {}
