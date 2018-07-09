import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SuccessFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'successFilter',
})
export class SuccessFilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], value): any[] {
    if (!items) {
      return [];
    }

    // Filter success
    items = items.filter(item => {
      if(value == true) { 
        return true;
      } 
      else {  
        if(item.launch_success != true) {
          return true;
        }
      }
    });
    
    return items;
  }
}
