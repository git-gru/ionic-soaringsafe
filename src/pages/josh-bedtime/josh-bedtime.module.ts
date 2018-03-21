import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JoshBedtimePage } from './josh-bedtime';

@NgModule({
  declarations: [
    JoshBedtimePage,
  ],
  imports: [
    IonicPageModule.forChild(JoshBedtimePage),
  ],
})
export class JoshBedtimePageModule {}
