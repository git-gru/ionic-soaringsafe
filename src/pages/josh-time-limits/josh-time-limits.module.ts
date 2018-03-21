import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JoshTimeLimitsPage } from './josh-time-limits';

@NgModule({
  declarations: [
    JoshTimeLimitsPage,
  ],
  imports: [
    IonicPageModule.forChild(JoshTimeLimitsPage),
  ],
})
export class JoshTimeLimitsPageModule {}
