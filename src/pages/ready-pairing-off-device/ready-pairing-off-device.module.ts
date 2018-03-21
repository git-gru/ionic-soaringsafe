import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReadyPairingOffDevicePage } from './ready-pairing-off-device';

@NgModule({
  declarations: [
    ReadyPairingOffDevicePage,
  ],
  imports: [
    IonicPageModule.forChild(ReadyPairingOffDevicePage),
  ],
})
export class ReadyPairingOffDevicePageModule {}
