import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nestedobjectsearch'
})
export class NestedobjectsearchPipe implements PipeTransform {


  transform(items: any, searchText: any, filteritem: any): any {
    if (!searchText) { return items; };
    if (!filteritem) { return items; };
    if (filteritem) {
        let filterKeys = Object.keys(filteritem);//nested object key
        let filtervalues = Object.values(filteritem);//nested object value
        return items.filter((item: any) => {
            return filterKeys.some((keyName) => {
                return filtervalues.some((valuename: any) => {
                    return item[keyName]?.[valuename].toLowerCase().includes(searchText);
                })
            });
        });
    }
    
}


}
