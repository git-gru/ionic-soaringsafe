import { NgModule } from '@angular/core';
import { JoshFiltersComponent } from './josh-filters/josh-filters';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { FiltersProvider } from '../providers/filters/filters';
import { JoshBedtimeComponent } from './josh-bedtime/josh-bedtime';
import { ProfileProvider } from '../providers/profile/profile';

@NgModule({
	declarations: [JoshFiltersComponent,
    JoshBedtimeComponent],
	imports: [
		IonicModule,
		CommonModule
	],
	exports: [JoshFiltersComponent,
    JoshBedtimeComponent],
	providers: [
		FiltersProvider, 
		ProfileProvider
	]
})
export class ComponentsModule {}
