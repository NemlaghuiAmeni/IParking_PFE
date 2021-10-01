import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Subject, Observable} from 'rxjs';
import { Park } from 'app/models/park.model';
@Injectable({
  providedIn: 'root'
})
export class ParkService {
  park: Parking ;
  parks: Parking[];
  private saveParkingUrl = '/api/addParking';
  private savePlaceingUrl='/api/addPlace';
  private deleteparkUrl = 'api/list/p';
  private updateparkUrl = '/api/list/m';
  private getlistParkUrl = '/api/list/parking';
  private getlistParkUrl1 = '/api/list/parking';
  private deleteReservationUrl = '/api/list/d';




  constructor(private http: HttpClient, private router: Router) { }



  // tslint:disable-next-line:variable-name
  addPark(park,place)  {
    return this.http.post<any>("/api/list/listParkingwithId", {park:park,place:place} );
  }
  deletePark(_id: string) {
    return this.http.delete(this.deleteparkUrl + `/${_id}`);
  }
  getListPark(userId) {
    return this.http.post("/api/list/listParkingwithId",{userId:userId})
  }

  updatepark(emp) {
    return this.http.put(this.updateparkUrl + `/${emp._id}`, emp);
  }
  updateparkn(emp) {
    return this.http.put(this.updateparkUrl + `/${emp.name}`, emp);
  }
  savePark(user) {
    return this.http.post<any>(this.saveParkingUrl, user );
  }
  getListReservation(userId){
    return this.http.post<any>("/api/list/listReservation", {userId:userId} );


  }
  getAdminListReservation(adminId){
    return this.http.post<any>("/api/list/listAdminReservation", {adminId:adminId} );


  }

  getByNamep(name: string) {
    return this.http.get(this.getlistParkUrl1 + `/${name}`);
  }
  savePlace(place) {
    return this.http.post<any>(this.savePlaceingUrl, place );
  }
  getAllPark(event){
    return this.http.post("/api/list/AllParking",event)

  }
  getParkWithName(name){
    return this.http.post("/api/list/ParkWithName",{name:name})

  }
  getParkWithNameMap(name){
    return this.http.post("/api/list/ParkWithNameMap",{name:name})

  }

  makeReservation(data){
    return this.http.post("/api/list/makeReservation",{data:data})


  }
  deleteReservation(_id: string) {
    return this.http.delete(this.deleteReservationUrl + `/${_id}`);
  }
  addPlace(park, place,adminId,rang){
    return this.http.post<any>("/api/list/addPLace", {place:place,park:park,adminId:adminId,rang:rang} );
  }
 deletePlace(place,rang){
    return this.http.post("/api/list/deletePlace",{place:place,rang:rang})

   }
 getListAllPark() {
    return this.http.post("/api/list/listAllParking",{})
  }
 private _listners=new Subject<any>();
 listen():Observable<any>{
   return this._listners.asObservable();
 }
 filter(filterBy:string){
   this._listners.next(filterBy);
 }
}

interface Parking {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  image:string;
  price: string;
  priceD:string;
  priceW:string;
  description:string;
  nbplace: number;
  capteur: [] ;

}
