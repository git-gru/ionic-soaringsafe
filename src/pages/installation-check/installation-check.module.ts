import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstallationCheckPage } from './installation-check';

@NgModule({
  declarations: [
    InstallationCheckPage,
  ],
  imports: [
    IonicPageModule.forChild(InstallationCheckPage),
  ],
})
export class InstallationCheckPageModule {}
