import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StartPairingOnDevicePage } from './start-pairing-on-device';

@NgModule({
  declarations: [
    StartPairingOnDevicePage,
  ],
  imports: [
    IonicPageModule.forChild(StartPairingOnDevicePage),
  ],
})
export class StartPairingOnDevicePageModule {}
