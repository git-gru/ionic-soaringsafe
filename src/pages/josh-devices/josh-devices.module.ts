import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JoshDevicesPage } from './josh-devices';

@NgModule({
  declarations: [
    JoshDevicesPage,
  ],
  imports: [
    IonicPageModule.forChild(JoshDevicesPage),
  ],
})
export class JoshDevicesPageModule {}
