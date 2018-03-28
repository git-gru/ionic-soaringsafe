import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetInitialFiltersPage } from './set-initial-filters';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SetInitialFiltersPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SetInitialFiltersPage),
  ],
})
export class SetInitialFiltersPageModule {}
