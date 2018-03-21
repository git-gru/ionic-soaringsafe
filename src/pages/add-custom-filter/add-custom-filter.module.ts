import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCustomFilterPage } from './add-custom-filter';

@NgModule({
  declarations: [
    AddCustomFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCustomFilterPage),
  ],
})
export class AddCustomFilterPageModule {}
