import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetInitialBedtimePage } from './set-initial-bedtime';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SetInitialBedtimePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SetInitialBedtimePage),
  ],
})
export class SetInitialBedtimePageModule {}
