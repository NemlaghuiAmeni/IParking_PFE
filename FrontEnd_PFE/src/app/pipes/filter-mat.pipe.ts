import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMat'
})
export class FilterMatPipe implements PipeTransform {

  transform(value: any, searchName:any): any {
    if (value.length === 0){
      return value;
    }
    return value.filter(function(search){
      return search.matricule.toLowerCase().indexOf(searchName.toLowerCase()) > -1

    });
  }

}
