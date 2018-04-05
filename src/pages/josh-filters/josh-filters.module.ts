import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JoshFiltersPage } from './josh-filters';

@NgModule({
  declarations: [
    JoshFiltersPage,
  ],
  imports: [
    IonicPageModule.forChild(JoshFiltersPage),
  ],
})
export class JoshFiltersPageModule {}
