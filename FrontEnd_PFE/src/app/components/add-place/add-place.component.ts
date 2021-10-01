import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit, Inject, ViewChild, ElementRef, NgZone} from '@angular/core';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import AnimatedPopup from 'mapbox-gl-animated-popup';
import * as Mapboxgl from 'mapbox-gl';
import { map } from 'rxjs/operators';
import { ParkService } from 'app/services/services/park.service';
import { NgForm } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MapParkComponent } from '../map-park/map-park.component';
import { Place } from 'app/models/place.model';
import { ReservationService } from 'app/services/services/reservation.service';
import { SocketService } from 'app/socket.service';
import Swal from 'sweetalert2';


declare var M:any;


@Component({
  selector: 'app-forms',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent implements OnInit {
  settings = {
    add: {
      addButtonContent: '<i class=""></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'name',
        type: 'string',
      },
      description: {
        title: 'description',
        type: 'string',
      },
      nbrSensor: {
        title: 'Device Number',
        type: 'string',
      },
      lat: {
        title: 'coordinators (Lattitude )',
        type: 'string',
      },
      lng: {
        title: 'coordinators (Longitude)',
        type: 'string',
      },
    },
  };
  placE:Place
  userId;
  marker = {} as any;
  markers = {} as any;
  reserv = {} as any;
  list = {} as any;
  liste = {} as any;
  selected: string;
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


  constructor( private auth: ParkService, private res: ReservationService, private router: Router,
    private socket: SocketService,private matDialog:MatDialog, private matDialogRef:MatDialogRef<AddPlaceComponent>) {
  }

  ngOnInit() {
    this.userId= localStorage.getItem("userId");
    this.auth.getListPark(this.userId.substr(1,this.userId.length-2)).subscribe((res) => {

      console.log("userId:  "+this.userId)
        console.log("marker: "+this.marker)
        this.marker = res;
      });
    this.placE=new Place();
    this.reserv.timeE = new Date();
    this.reserv.timeS = new Date();
    this.reserv.dateE = new Date();
    let nbs = 0;
    this.place = [];
    this.refreshEmployeeList();
    this.res.getListReservation().subscribe((res) => {
      this.list = res;
    });
    this.socket.listen('vv').subscribe((res) => {
      console.log(res);
      this.ts.push(res);
      const kk = this.ts[(this.ts.length - 1)];
      console.log('dddddcccccdtstststssdsdsdsdsdsssssss', this.ts[(this.ts.length - 1)][0][2]);
    });
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
  }

  refreshEmployeeList() {
    const s = localStorage.getItem('role');
    const ss = JSON.parse(localStorage.getItem('roles'));

    if ( s === 'sup' || s === 'admin' ) {
      this.selected = ss.user.parking;
      console.log("ss:   : "+ ss.user.parking)
      console.log('rrrrrttgg' , ss.user.parking);
      this.auth.getByNamep(this.selected).subscribe((res) => {
        this.marker = res;
      });
      console.log('rrr', this.marker);
    } else {


    }

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
    addCapteur() {
      //this.auth.savePlace(this.placE)
      console.log("place name: "+this.placE.name)
      console.log("place rang: "+this.placE.id)

      this.auth.addPlace(this.parkE,this.placE.name,this.userId.substr(1,this.userId.length-2),this.placE.id)
      .subscribe(data => { console.log(data+"dataa")
      Swal.fire(
        'Success!',
        'Place Added Succesfully',
        'success',
    );
    this.onCloseDialog();

      this.auth.getParkWithNameMap(this.parkE).subscribe(data=>{
        this.placesPark=data
        console.log("placePark: "+this.placesPark);

      })
  });

    }


    deleteCapteur(j) {
    console.log("place to be deleted: "+j.name)
    console.log("selected Park"+this.selected)
      if (confirm('Do you really want to delete this record?') === true) {
    this.auth.deletePlace(j.name,j.rang).subscribe((res) => {
    console.log("res: "+res)
    this.auth.getParkWithNameMap(this.selected).subscribe(data=>{
        this.placesPark=data
    console.log("place after delete: "+this.placesPark )
           })

      });
  }
  }
  nbRepition() {}

   onOpenMap(){
    let dialogRef = this.matDialog.open(MapParkComponent, {
      width: '60%',
      panelClass: 'custom-modalbox',
      disableClose:true
  });
  }
   onCloseDialog()
   {
     this.matDialogRef.close(false);
     this.auth.filter('Register click');


   }
  }















