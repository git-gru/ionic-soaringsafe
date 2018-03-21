import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StartPairingPage } from './start-pairing';

@NgModule({
  declarations: [
    StartPairingPage,
  ],
  imports: [
    IonicPageModule.forChild(StartPairingPage),
  ],
})
export class StartPairingPageModule {}
