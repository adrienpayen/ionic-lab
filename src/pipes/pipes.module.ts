import { NgModule } from '@angular/core';
import { FilterPipe } from './filter/filter';
import { LaunchFilterPipe } from './launch-filter/launch-filter';
import { SuccessFilterPipe } from './success-filter/success-filter';
import { FailFilterPipe } from './fail-filter/fail-filter';
import { DateRangeFilterPipe } from './date-range-filter/date-range-filter';
@NgModule({
	declarations: [FilterPipe,
    LaunchFilterPipe,
    SuccessFilterPipe,
    FailFilterPipe,
    DateRangeFilterPipe],
	imports: [],
	exports: [FilterPipe,
    LaunchFilterPipe,
    SuccessFilterPipe,
    FailFilterPipe,
    DateRangeFilterPipe]
})
export class PipesModule {}
