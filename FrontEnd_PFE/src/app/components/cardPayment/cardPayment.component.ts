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
import { AddParkComponent } from '../add-park/add-park.component';
import {ListparksComponent} from '../listparks/listparks.component'
import { from } from 'rxjs';

declare var M:any;


@Component({
  selector: 'app-parks',
  templateUrl: './cardPayment.component.html',
  styleUrls: ['./cardPayment.component.scss']
})
export class CardPaymentComponent implements OnInit {
  public pageData;
  List:boolean;
  Map:boolean;
  userId =null;
  map:Mapboxgl.Map;
  popup:Mapboxgl.Popup;
  markers = {} as any;
  marker = {} as any ;
  list = {} as any;
  parking = {} as any;
  M: any;
  t = ',';
  file: any ;
  k = {};
  path;
  imagePreview: any;
  image: any;
  edits = false;
  role = '';
  selected: string;
  editss = false;
  options = {
    componentRestrictions : {
      country: ['TUN']
    }
  };
  p = [] as any;
  uploadfile: File;
  defaultvalue: string;
  public el = new mapboxgl.Marker();
  private Latitude: number;
  private Longitude: number;

  constructor(private auth: ParkService,router: Router, private route: ActivatedRoute, private http: HttpClient, private matDialog:MatDialog) {
    this.auth.listen().subscribe((m:any)=>{
      console.log(m);
    })
  }

  ngOnInit() {

    this.userId= localStorage.getItem("userId");
    this.role = localStorage.getItem('role');
    console.log(this.userId,"welcome");
    
    // tslint:disable-next-line:no-unused-expression
     if (!this.userId)  {
      window.location.replace('login');
    }
    //this.showMap();


  }
                                                                            //****Partie Parking****//

  refreshList() {
    const s = localStorage.getItem('role');
    const ss = JSON.parse(localStorage.getItem('roles'));
    if ( s === 'sup' || s === 'admin' ) {
      this.selected = ss.user.parking;
      console.log('rrr' , ss.user.parking);
      this.auth.getByNamep(this.selected).subscribe((res) => {
        this.marker = res;
      });
      console.log('rrrrfffmar', this.marker);
    } else {

      this.auth.getListPark(this.userId.substring(1,this.userId.length-2)).subscribe((res) => {
        this.marker = res;
      });
    }

  }
  // tslint:disable-next-line:variable-name
  onDeletee(_id: string) {
    if (confirm('Do you really want to delete this parking ?') === true) {
      this.auth.deletePark(_id).subscribe((res) => {
        this.refreshList();
      });
    }
  }
  resetForm() {
    this.markers.name = '';
    this.markers.latitude = '';
    this.markers.longitude = '';
    this.markers.price = '';
    this.markers.nbplace = '';
  }
  saveParking() {

    this.markers.image = this.imagePreview;
    this.markers.capteur = this.p;
    this.markers.userId=this.userId.substr(1,this.userId.length-2);
    console.log("length: "+this.userId.length)
    console.log("userMarker: "+this.userId.substr(1,this.userId.length-2))
    console.log(this.markers);
    if (this.markers.name !== '') {
      console.log(this.markers.name);
      this.auth.savePark(this.markers).subscribe(
        res => {
          res = this.markers ;
          this.resetForm();
          this.refreshList();

        },
        err => console.log(err)
      ); } else {/*
     return this.service.error('ERROR', 'Check your fields' , {
        position: ['bottom', 'right'],
        timeOut: 5000,
        animation: 'fade',
        showProgressBar: true
      });*/
    }
    console.log('fil l5er' , this.markers);
  }
  public handleAddressChange(address: any) {
    this.markers.name = address.formatted_address;
  }
  onEdit(emp) {
    console.log(emp);
    this.markers.name = emp.name;
    this.markers.latitude = emp.latitude;
    this.markers.longitude = emp.longitude;
    this.markers.price = emp.price;
    this.markers.nbplace = emp.nbplace;
    this.markers._id = emp._id;
  }
  onSubmit() {
     this.t = 'Your devices, ';
      this.p.push({firstName: 'Your devices' , lastName: '' });
      this.markers.capteur = this.p;
      this.markers.image = this.imagePreview;
      if (this.markers.name != null) {
      this.auth.updatepark(this.markers).subscribe((res) => {
        this.resetForm();
        this.refreshList();
        this.edits = true;
      });
    } else {
      this.editss = true;
    }

  }

selectImage(event: Event) {

  const file = (event.target as HTMLInputElement).files[0];
  console.log(file);
  const reader = new FileReader();
  reader.onload = () => {
  this.imagePreview = reader.result;
  console.log('ima', this.imagePreview);
  };
  reader.readAsDataURL(file);
  }
  onOpenDialog(){
    ///this.matDialog.open(AddParkComponent);
    let dialogRef = this.matDialog.open(AddParkComponent, {
      width: '25%',
      panelClass: 'custom-modalbox',
      disableClose:true
  });
  this.refreshList();
  }
                                                              //****Partie Map****//
  // Afficher Map
  showMap(){
    (Mapboxgl as any).accessToken='pk.eyJ1Ijoibm91cnJvbWRoYW5lIiwiYSI6ImNrbmdweG81eTM3YzYyb254YnB3MG1nYXYifQ.dawn69wk0PtTvwxd7BsHgg';
    (this.map) = new Mapboxgl.Map({
    container: 'map-mapbox', // container id
    style: 'mapbox://styles/nourromdhane/cknhn4tq40nrv17p4698ntwp8',
    center:  [9.196506147691451 , 33.792635314317465], // Tunisia position
    zoom: 5.5 // starting zoom
    });
    // Add Controls to the map
    (this.map).addControl(
      new MapboxGeocoder({
      countries:'tn',
      accessToken: Mapboxgl.accessToken,
      mapboxgl: (mapboxgl as any),
      placeholder: 'Enter an Address ',


      }))
      // Add zoom and rotation controls to the map.
      this.map.addControl(new Mapboxgl.NavigationControl());
      // Add geolocate control to the map.
      this.map.addControl(
        new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserLocation:true,
        })
        );
        this.map.on('click', hello => {
          this.Longitude = hello.lngLat.lng;
          this.Latitude = hello.lngLat.lat;
          this.el.setLngLat([hello.lngLat.lng, hello.lngLat.lat])
          .setPopup(new mapboxgl.Popup(
            {
               offset: 25,


          }).setHTML('<h6 class="text-info"> Longitude :' + this.Longitude + '  <br>  Latitude :' +this.Latitude + '</h6>')
          )
            .addTo(this.map)

            console.log(this.el.getLngLat())
        });
      }
      stylestreet() {
        this.map.setStyle('mapbox://styles/mapbox/streets-v11');
      }
      stylesatelite() {
        this.map.setStyle('mapbox://styles/nourromdhane/ckp2g5lp3454517mj9esmvkcg');
      }
  // Add Marker to get Longitude & Latitude
  createMarker(lng:number, lat:number){
    const marker=new Mapboxgl.Marker({
      draggable:true,
      color:'red'
    })
    .setLngLat([lng,lat])
    .addTo(this.map)
    marker.on('drag',() => {
      console.log(marker.getLngLat());
    })
   }

  }















