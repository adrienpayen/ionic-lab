import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DateRangeFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'dateRangeFilter',
})
export class DateRangeFilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], value): any[] {
    if (!items) {
      return [];
    }

    if (!value) {
      return items;
    }
  }
}
