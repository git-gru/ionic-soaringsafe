import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JoshReportsPage } from './josh-reports';

@NgModule({
  declarations: [
    JoshReportsPage,
  ],
  imports: [
    IonicPageModule.forChild(JoshReportsPage),
  ],
})
export class JoshReportsPageModule {}
