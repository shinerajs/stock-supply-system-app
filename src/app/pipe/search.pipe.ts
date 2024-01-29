
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: any, filter: any): any {


    // // Check if search term contains regular expression characters
    // const regex = /[+*?()\\[\]{}|^$./]/g;
    // if (regex.test(filter)) {
    //   console.log('Error: Regular expressions are not allowed in search terms.');
     
    //   return items;
    // }
    // // Continue with normal search logic
    // else{
      if (!filter) {
        return items;
      }
  
      if (!Array.isArray(items)) {
        return items;
      }
  
      if (filter && Array.isArray(items)) {
        let filterKeys = Object.keys(filter);
        return items.filter(item => {
          return filterKeys.some((keyName) => {
            return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] == "";
          });
        });
      }

    //}


    
  }


}
