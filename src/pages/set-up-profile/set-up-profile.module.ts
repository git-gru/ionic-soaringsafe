import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetUpProfilePage } from './set-up-profile';

@NgModule({
  declarations: [
    SetUpProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(SetUpProfilePage),
  ],
})
export class SetUpProfilePageModule {}
