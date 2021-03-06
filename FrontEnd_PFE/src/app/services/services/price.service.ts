import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private savePriceUrl = '/api/addPrice';
  private deletePriceUrl = '/api/list/price';
  private getlistPriceUrl = '/api/list/price';


  constructor(private http: HttpClient, private router: Router) { }


  // tslint:disable-next-line:variable-name
  deletePrice(_id: string) {
    return this.http.delete(this.deletePriceUrl + `/${_id}`);
  }

  savePrice(pri) {
    return this.http.post<any>(this.savePriceUrl, pri);
  }

  getListPrice() {
    return this.http.get<any>(this.getlistPriceUrl);
  }
}
