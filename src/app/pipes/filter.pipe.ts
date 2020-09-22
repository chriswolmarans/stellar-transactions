import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'appFilter'})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerms: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchTerms) {
      return items;
    }
    searchTerms = searchTerms.trim().toLocaleLowerCase();

    return items.filter((item) => {
      // get short month e.g Nov with date[1]
      const date = new Date(item.date).toString().split(' ');
      return item.beneficiary.toLowerCase().indexOf(searchTerms) > -1
        || item.amount.toString().toLowerCase().indexOf(searchTerms) > -1
        || new Date(item.date).getDate().toString().toLowerCase().indexOf(searchTerms) > -1
        || date[1].toString().toLowerCase().indexOf(searchTerms) > -1
      ;
    });
  }
}
