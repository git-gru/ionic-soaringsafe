import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateChildProfilePage } from './create-child-profile';

@NgModule({
  declarations: [
    CreateChildProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateChildProfilePage),
  ],
})
export class CreateChildProfilePageModule {}
