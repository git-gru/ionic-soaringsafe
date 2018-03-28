import { NgModule } from '@angular/core';
import { JoshFiltersComponent } from './josh-filters/josh-filters';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { FiltersProvider } from '../providers/filters/filters';

@NgModule({
	declarations: [JoshFiltersComponent],
	imports: [
		IonicModule,
		CommonModule
	],
	exports: [JoshFiltersComponent],
	providers: [
		FiltersProvider
	]
})
export class ComponentsModule {}
