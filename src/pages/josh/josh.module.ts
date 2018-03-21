import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JoshPage } from './josh';

@NgModule({
  declarations: [
    JoshPage,
  ],
  imports: [
    IonicPageModule.forChild(JoshPage),
  ],
})
export class JoshPageModule {}
