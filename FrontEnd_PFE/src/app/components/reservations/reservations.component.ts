import { Component, OnInit } from '@angular/core';
import { ParkService } from 'app/services/services/park.service';
import { ReservationService } from 'app/services/services/reservation.service';
import { Router } from '@angular/router';
import { SocketService } from 'app/socket.service';
import { MatDialog } from '@angular/material/dialog';
import { PriceService } from 'app/services/services/price.service';

@Component({
  selector: 'app-ui-elements',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class  ReservationsComponent implements OnInit {
  userId;
  marker = {} as any;
  list = {} as any;
  selected: string;
  listR;
  matricule: string;
  myPrice = [] as any;
  prices =  {} as any;
  selecteds = '';
  valid = [false, false, false] as any  ;
  placesPark: any;
  parkE: string;
  Property: string;
  tt: any;
  t: any;
  reserv: any;
  place: any;
  ts: any;
  adminId: any;
  searchName:string="";
  searchMat:string="";
  constructor(private parkS: ParkService, private resService: ReservationService,
    private router: Router, private socket: SocketService,
    private matDialog:MatDialog,private priceService: PriceService,) { }

  ngOnInit() {
    this.userId= localStorage.getItem("userId");
    this.adminId=localStorage.getItem("adminId");
    //this.userId=this.userId.substr(1,this.userId.length-2)
    this.parkS.getAdminListReservation(this.userId)
    .subscribe( data=>{
     console.log(data,this.userId,"datajshh");
     
     
      //const resSTR = JSON.stringify(data);
     //const resJSON = JSON.parse(resSTR);
     this.listR=data
   console.log("listR",this.listR)
  } );

  }
  ///Afficher la liste des parks
  selectedPark(selectedValue: string) {
    this.selected = selectedValue;
    this.resService.getByName(this.selected).subscribe((res) => {
    this.list = res;
  });
  }
  //Supprimer Reservation
  onDelete(_id: string) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.resService.deletelistReservation(_id)
      .subscribe((res) => {
        this.ngOnInit();
      });
    }
  }


}
