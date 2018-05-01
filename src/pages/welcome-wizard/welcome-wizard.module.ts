import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomeWizardPage } from './welcome-wizard';

@NgModule({
  declarations: [
    WelcomeWizardPage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomeWizardPage),
  ],
})
export class WelcomeWizardPageModule {}
