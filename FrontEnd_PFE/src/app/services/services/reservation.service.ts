import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  getParkWithNameMap(selectedValue: string) {
    throw new Error("Method not implemented.");
  }
  private reservationUrl = '/api/saveres';
  private deleteListReservationUrl = '/api/list/d';
  private getListReservationUrl = '/api/list/res';
  private getByMatricule = '/api';





  constructor(private http: HttpClient, private router: Router) { }

  getListReservation() {
    return this.http.get<any>(this.getListReservationUrl);
  }

  // tslint:disable-next-line:variable-name
  deletelistReservation(_id: string) {
    return this.http.delete(this.deleteListReservationUrl + `/${_id}`);
  }
  getByMat(matricule: string) {
    return this.http.get(this.getByMatricule + `/${matricule}`);
  }
  getByName(name: string) {
    return this.http.get(this.getListReservationUrl + `/${name}`);
  }
  saveReservation(user) {
    return this.http.post<any>(this.reservationUrl, user);
  }
}
