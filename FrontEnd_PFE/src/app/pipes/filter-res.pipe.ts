import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRes'
})
export class FilterResPipe implements PipeTransform {

  transform(value: any, searchName:any): any {
    if (value.length === 0){
      return value;
    }
    return value.filter(function(search){
      return search.park.toLowerCase().indexOf(searchName.toLowerCase()) > -1

    });
  }

}
