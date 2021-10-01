import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterparkID'
})
export class FilterparkIDPipe implements PipeTransform {

  transform(value: any , searchID : any):any {
    if (value.length === 0){
      return value;
    }
    return value.filter(function(search){
      return search._id.indexOf(searchID) > -1

    });  }


}
