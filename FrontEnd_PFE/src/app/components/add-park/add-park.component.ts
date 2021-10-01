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
import { Park } from 'app/models/park.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WelcomeComponent } from '../welcome/welcome.component';
import { MapParkComponent } from '../map-park/map-park.component';
import Swal from 'sweetalert2';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

declare var M:any;


@Component({
  selector: 'app-forms',
  templateUrl: './add-park.component.html',
  styleUrls: ['./add-park.component.scss']
})
export class AddParkComponent implements OnInit {
  public pageData;
  userId;
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

  constructor(private auth: ParkService,private router: Router,
    private route: ActivatedRoute, private http: HttpClient, private matDialog:MatDialog, private matDialogRef:MatDialogRef<AddParkComponent>) {
  }
  addForm = new FormGroup({
    name: new FormControl(),
    price:new FormControl()
  });
  submitted = false;
  Submit() {
    this.submitted = true ;

    this.auth.savePark(
        {
        name: this.addForm.get('name').value,
        price:this.addForm.get('price').value,
        lng : this.Longitude,
        lat : this.Latitude,
      }).subscribe(data => {
      const resSTR = JSON.stringify(data);
      const resJSON = JSON.parse(resSTR);
     // console.log(resJSON);
      if (resJSON.status === 'err') {
        Swal.fire(
          'error!',
          'Please check your data',
          'error',
        );
      } else { Swal.fire(
        'Success!',
        'Site has been added.',
        'success',
      );
        this.addForm.reset();
        this.Latitude = null ;
        this.Longitude = null ;
        this.router.navigate(['/pages/allsite']);
      }
    }, error => {
    });
  }
  ngOnInit() {
    this.userId= localStorage.getItem("userId");
    this.role = localStorage.getItem('role');
    // tslint:disable-next-line:no-unused-expression
    if (localStorage.length === 0) {
      window.location.replace('login');
    }
    this.resetForm();
    this.refreshList();

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

      this.auth.getListPark(this.userId.substr(1,this.userId.length-2)).subscribe((res) => {
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

          this.onCloseDialog();


        },
        err => console.log(err)
      );

    } else {/*
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




   onOpenMap(){
    ///this.matDialog.open(AddParkComponent);
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















