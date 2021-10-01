import { Component, OnInit } from '@angular/core';
import { ParkService } from 'app/services/services/park.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ReservationService } from 'app/services/services/reservation.service';
import { ChartsModule } from 'ng2-charts';
import { MatDialog } from '@angular/material/dialog';
import { WelcomeComponent } from '../welcome/welcome.component';
import { Place } from 'app/models/place.model';
import { SocketService } from 'app/socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userId;
  marker = {} as any;
  markers = {} as any;
  reserv = {} as any;
  list = {} as any;
  liste = {} as any;
  selected: string;
  nbparking=0;
  t = [] as any;
  firstName= {} as any;
  placesPark;
  reserveD;
  k;
  r:string;;
  Property;
  matricule;
  capteur=[];
  valid: boolean;
  tt = [] as any;
  tts = [false, true, true, false];
  place = [] as any;
  places = [] as any;
  ts = [] as any;
  parkE;
  m = 0;
  isDraggable: boolean;
  parking = {} as any;
  m = 0;
  selected: string;
  cmp = 0;
  nbv = 0;
  nbf = 0;
  nbt = 0;
  nbc = 0;
  nbn = 0;
  nbp = 0;
  prix = 0;
  time: Date = new Date();
  markerss = {} as any ;
  lists = {} as any;
  times =  new Date();
  priceT = 0;
  priceW = 0;
  priceD = 0;

  constructor(private auth: ParkService, private res: ReservationService, private router: Router, private socket: SocketService,private matDialog:MatDialog) {

  }

  ngOnInit() {
    this.userId= localStorage.getItem("userId");
    this.auth.getListPark(this.userId.substr(1,this.userId.length-2)).subscribe((res) => {

      console.log("userId:  "+this.userId)
        console.log("marker: "+this.marker)
        this.marker = res;
      });
  }
  filterChanged(selectedValue: string) {
    this.auth.getParkWithNameMap(selectedValue).subscribe(data=>{
         this.placesPark=data
         console.log("placePark: "+this.placesPark)
       })
       this.parkE=selectedValue;
       this. kafka();
       let nbs = 0;
       let nb = 0 ;
       localStorage.setItem('Property', 'etat');
       this.Property = localStorage.getItem('Property');
       // l =  this.listPlaces.filter(e => !this.place.includes(e));
       this.selected = selectedValue;
       this.tt = [] as any;
       console.log("selected value: "+selectedValue);
       // tslint:disable-next-line:prefer-for-of

       for (let i = 0; i < this.marker.length; i++) {

         if (this.selected === this.marker[i].name) {

          this.t=this.marker[i].capteur;
           console.log('AMOUNA:',this.t);}}

       for (let i = 0; i < 200; i++) {
         this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
         this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
         console.log('vvvvvvvvvvvvvv', this.list[i].timeS.getTime() >= this.reserv.timeE.getTime());
         console.log('vvvvvvvvvvvv', this.selected);
         if (this.marker[i].name === this.selected || this.marker[i].name.toString() + ' ' === this.selected ) {
           console.log('oui');
           nb = this.marker[i].nbplace;
           console.log('nb', nb);
           console.log('nbi', this.list[i].timeS.getTime() >= this.reserv.timeE.getTime());
           // tslint:disable-next-line:prefer-for-of
           for (let k = 0 ; k < this.list.length ; k++) {
             this.list[k].timeS = new Date(Number(Date.parse(this.list[k].timeS)));
             this.list[k].timeE = new Date(Number(Date.parse(this.list[k].timeE)));
             if (this.selected === this.list[k].name &&
               (this.list[k].timeS.getTime() >= this.reserv.timeE.getTime() && this.list[k].timeE.getTime() <= this.reserv.timeE.getTime()) ) {
                 nbs ++;
                 console.log('ti + nb', nbs);
                 console.log('ti + nbp', this.list[k]);
                 // tslint:disable-next-line:radix
                 this.place.push(parseInt(this.list[k].place));
                 console.log('gggg' , this.place );
             }
         }

         this.t = this.marker[i].capteur;

           for (let i = 0 ; i < this.list.length ; i++) {
            for (let j = 0 ; j < 100 ; j++) {
                if(this.list[i].place==j+1 && this.list[i].name==this.selected){
               this.t[j].lastt='orange';
             console.log('AMAL',j+1); } } }

         this.t = this.marker[i].capteur;
           for (let j = 0; j < 1000 /*nb*/; j++) {
           console.log('Geg',this.t[j].firstName);

             // tslint:disable-next-line:max-line-length


            if ( this.ts[(this.ts.length - 1)][0][2] === 'true'  && this.ts[(this.ts.length - 1)][0][0] === this.t[j].firstName ) {
               console.log('loulou',this.ts);
               this.tt.push({first: this.ts[(this.ts.length - 1)][0][0] , last: 'red' } );
               this.t[j].last='red';
               this.t[j].gest=this.ts[(this.ts.length - 1)][0][3];

             } else if ( this.ts[(this.ts.length - 1)][0][2] === 'false'  && this.ts[(this.ts.length - 1)][0][0] === this.t[j].firstName ){
               console.log('how', this.ts);
               this.tt.push({first: this.ts[(this.ts.length - 1)][0][0] , last: 'green' } );
               this.t[j].last='green';
               this.t[j].gest=this.ts[(this.ts.length - 1)][0][3];
             }
             console.log('ttttt', this.tt);

           }

         }
       }
}

kafka() {
  let nbs = 0;
  this.place = [];
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0 ; i < this.list.length ; i++) {
    this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
    this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
    console.log('vvvvvvvvvvvvvv', this.list[i].timeS.getTime());
    console.log('vvvvvvvvvvvv', this.reserv.dateE);
    if (this.selected === this.list[i].name &&
      (this.list[i].timeS.getTime() >= this.reserv.timeE.getTime() && this.list[i].timeE.getTime() <= this.reserv.timeE.getTime()) ) {
        nbs ++;
        console.log('ti + nb', nbs);
        // tslint:disable-next-line:radix
        this.place.push(parseInt(this.list[i].place));
        console.log('gggg' , this.place );
    }
}
  localStorage.setItem('Property', 'etat');
  this.Property = localStorage.getItem('Property');
   return nbs;
}


}
