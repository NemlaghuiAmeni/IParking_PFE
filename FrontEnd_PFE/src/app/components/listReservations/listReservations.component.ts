 import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import { ReservationService } from 'app/services/services/reservation.service';
import { PriceService } from 'app/services/services/price.service';
import { ParkService } from 'app/services/services/park.service';
import { SocketService } from 'app/socket.service';

@Component({
  selector: 'app-forms',
  templateUrl: './listReservations.component.html',
  styleUrls: ['./listReservations.component.scss']
})
export class ListReservationsComponent implements OnInit {
  name;matriculE;price;dateE;dateF;timeE;timeF;Place;
  userId;
  listR
  list = [] as any ;
  matricule: string;
  myPrice = [] as any;
  prices =  {} as any;
  marker =  {} as any;
  selected = '';
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
  constructor(private resService: ReservationService,
    private priceService: PriceService, private socket: SocketService,
    private router: Router, private parkS: ParkService) {}

  ngOnInit() : void{
    this.userId = localStorage.getItem('userId');
    this.userId=this.userId.substr(1,this.userId.length-2)
    console.log("userId from reservation: "+this.userId);
    this.parkS.getListReservation(this.userId)
       .subscribe( data=>{
        const resSTR = JSON.stringify(data);
        const resJSON = JSON.parse(resSTR);
        this.listR=resJSON
      console.log("listR: "+this.listR)


     } );



  }
  onDelete(_id: string) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.parkS.deleteReservation(_id)
      .subscribe((res) => {
        this.ngOnInit();
      });
    }
  }
  onValidReservation(i) {
    const x = document.getElementById('mytable').getElementsByTagName('tr');
    x[i + 1].style.backgroundColor = 'yellow';
    this.prices.valeur = this.list[i].Tpark;
    this.prices.date = this.list[i].dateE;
    this.myPrice.push(this.prices);
    console.log(this.myPrice[i]);
    this.valid[i + 1] = true;
    this.priceService.savePrice(this.myPrice[i]).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }
  somefunction(i: number, id: string) {
    const x = document.getElementById('mytable').getElementsByTagName('tr');
    x[i + 1].style.backgroundColor = '#FFFFFF';
    this.valid[i + 1] = false;
    if (confirm('Are you sure to delete this record ?') === true) {
      this.priceService.deletePrice(id).subscribe((res) => {
      });
    }
  }

  FilterChanged(selectedValue: string) {
    this.selected = selectedValue;
    this.resService.getByName(this.selected).subscribe((res) => {
    this.list = res;
  });
  }
///Afficher la liste des parks
selectedPark(selectedValue: string) {
  this.selected = selectedValue;
  this.resService.getByName(this.selected).subscribe((res) => {
  this.list = res;
});
}

}
