import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

    /**
     * Returns launches that start with the same letters as the SearchText
     * @param items 
     * @param searchText 
     */
    transform(items: any[], searchText: string): any[] {
        if (!items) {
            return [];
        }

        if (!searchText) {
            return items;
        }

        searchText = searchText.toLowerCase();
        return items.filter(item => {
            return item.mission_name.toLowerCase().includes(searchText);
        });
    }
}