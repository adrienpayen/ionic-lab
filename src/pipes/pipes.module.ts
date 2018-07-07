import { NgModule } from '@angular/core';
import { FilterPipe } from './filter/filter';
import { LaunchFilterPipe } from './launch-filter/launch-filter';
@NgModule({
	declarations: [FilterPipe,
    LaunchFilterPipe],
	imports: [],
	exports: [FilterPipe,
    LaunchFilterPipe]
})
export class PipesModule {}
