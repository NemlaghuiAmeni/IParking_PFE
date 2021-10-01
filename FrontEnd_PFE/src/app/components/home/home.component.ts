import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import { ReservationService } from 'app/services/services/reservation.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'app/services/services/auth.service';
import { ParkService } from 'app/services/services/park.service';
import { NotificationsService } from 'angular2-notifications';
import { FooterComponent } from '../shared/footer/footer.component';
import { FormGroup, FormArray, FormBuilder,Validators,ReactiveFormsModule, FormControl  } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  parkSelected;
  placeSelected;
  listPlace=[]
  parks=[]
  form: any;
  reserv = {} as any;
  list = {} as any ;
  listParking = [] as any ;
  keyword = 'name';
  lista = {} as any ;
  a: string;
  data = [];
  image = '' ;
  nbPPatking = 0;
  user = localStorage.getItem('name');
  image1 = 'assets/images/cap1.JPG';
  image2 = 'assets/images/Capture.JPG';
  nbPlaceParking = 0;
  blasaFilPark: number;
  karehbaMawjouda: number;
  place = [];
  nombrePlaceDP = 0;
  userId;
  adminId;
  TypeValidateSelectError: boolean;
  price: any;
  selectedOption: string;
  selectedP: string;
  constructor(private auth: ReservationService, private router: Router,
    public dialog: MatDialog, private route: ActivatedRoute,
    private auths: AuthService, private service: NotificationsService,
    public dialod: MatDialog, private parkService: ParkService) {

      this.userId=localStorage.getItem('userId');
      this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      Tpark: new FormControl('', Validators.required),
      matricule: new FormControl('', Validators.required),
      dateE: new FormControl('', Validators.required),
      timeE: new FormControl('', Validators.required),
      dateS: new FormControl('', Validators.required),
      timeS: new FormControl('', Validators.required)
    });

    this.parkService.getAllPark("event").subscribe(data=>{
      const resSTR = JSON.stringify(data);
      const resJSON = JSON.parse(resSTR);
      this.data = resJSON;
    this.parks=[' ']
    let i=0;
    for (i;i<this.data.length;i++){
      this.parks.push(this.data[i])
    }
      const listP =JSON.stringify(resJSON)
    })
   }
       selectEvent(item) {
        console.log(item);
        this.nbPlace();
        this.reserv.Tpark = item.price ;
        this.reserv.name = item.name ;
        console.log(this.reserv.name);
        this.image = item.image ;
        console.log('rrrrrrrrrrrr', this.image);

  }
  onFocused(e) {
    console.log('focus');
    this.nbPlace();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < this.listParking.length ; i++) {
      if (this.listParking[i].name === this.reserv.name) {
        console.log(this.listParking[i].nbplace);
        this.blasaFilPark = this.listParking[i].nbplace;
        this.reserv.Tpark = this.listParking[i].price;
        return this.listParking[i].nbplace;
      }
    }
  }
  ngOnInit() {
    this.reserv.timeE = new Date();
    this.reserv.timeS = new Date();
    this.auth.getListReservation()
    .subscribe(res => this.list = res);
    this.parkService.getListPark("").subscribe((res) => {
      this.listParking = res;
      console.log(this.listParking);
      this.data = this.listParking;
      console.log('dddddddddddddddddddd', this.data);
    });

    this.auth.getByMat(localStorage.getItem('matricule')).subscribe((res) => {
      this.lista = res;
      console.log('hyyy', this.lista[0]._id);
      this.a = this.lista[0]._id ;
    });
  }


  saveCall() {

    const data = {} as any ;
    data.name = this.reserv.name;
    data.Tpark = this.reserv.Tpark;
    data.dateE = this.reserv.dateE;
    data.dateS = this.reserv.dateS;
    data.matricule = this.reserv.matricule;
    data.timeE = this.reserv.timeE;
    data.timeS = this.reserv.timeS;
    data.place = localStorage.getItem('idPlace');
    data.typeCar = localStorage.getItem('typeCar');
    //if ( this.nbRepition() >= this.nbPlace()) {
    //  return this.service.info('NO PLACE ', this.premierPlaceVide() , {
      //  position: ['bottom', 'right'],
      //  timeOut: 20000,
       // animation: 'fade',
       // showProgressBar: true
     // });
   // } else {
    if ( !this.reserv.Tpark || !this.reserv.dateE ||
      !this.reserv.timeE || !this.reserv.dateS || !this.reserv.timeS || this.timeRespect()   ) {
      this.service.error('ERROR', 'verifier vos champs et votre login' , {
        position: ['bottom', 'right'],
        timeOut: 5000,
        animation: 'fade',
        showProgressBar: true
      });

    } else if ( localStorage.getItem('name') == null ) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/map'], {
        queryParams: {data: JSON.stringify(data)}
      });
      //this.dialod.open(GestionComponent);
    }
    if ( this.karehbaMawjouda < this.blasaFilPark) {
      this.karehbaMawjouda ++;
      console.log('rrrr', this.karehbaMawjouda);
      localStorage.setItem('p', this.karehbaMawjouda.toString() );
    } else {
      this.karehbaMawjouda = 1 ;
    }
   // }

  }


// Nombre de voitures dans le parking
  nbRepition() {
    let nb = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < this.list.length ; i++) {
      this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
      this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
      console.log('vvvvvvvvvvvvvv', this.list[i].timeS.getTime());
      if (this.reserv.name === this.list[i].name && this.reserv.dateE === this.list[i].dateS &&
        (this.list[i].timeS.getTime() >= this.reserv.timeE.getTime() && this.list[i].timeE.getTime() <= this.reserv.timeE.getTime()) ) {
          nb ++;
          console.log('ti + nb', nb);
          // tslint:disable-next-line:radix
          this.place.push(parseInt(this.list[i].place));
          console.log('gggg' , this.place );
      }
    }
    this.nbPlace();
    console.log('gggg1' , this.reserv.name );
    console.log('gggg2' , this.nombrePlaceDP);
    console.log('gggg3' , this.place);
    console.log('ti nb', nb);
    this.karehbaMawjouda = nb;
    return nb;
  }



  //Nombre de place dans le parking choisi
  nbPlace() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < this.listParking.length ; i++) {
      if (this.listParking[i].name === this.reserv.name) {
        console.log(this.listParking[i].capteur.length-1);
        this.blasaFilPark = this.listParking[i].capteur.length;
        this.reserv.Tpark = this.listParking[i].price;
        this.nombrePlaceDP =  this.listParking[i].capteur.length;

        return this.listParking[i].capteur.length-1;
      }
    }

  }
  // Quand est-ce que une première place sera vide
  premierePlaceVide() {
    // tslint:disable-next-line:prefer-for-of
    const d = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < this.list.length ; i++) {
      this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
      this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
      if (this.list[i].dateS === this.reserv.dateE) {
        if (this.list[i].timeS.getTime() > this.reserv.timeE.getTime()  ) {
          d.push(this.list[i]);
        }
      }
    }
    console.log('heeh', d);
    let max = d[0];
    for (let i = 1; i < d.length; ++i) {
      d[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
      if (d[i].timeS.getTime() < max.timeS.getTime()) {
        max = d[i];
    }

      return max.timeS ;
  }

  }

  timeRespect() {
    if (this.reserv.timeE.getTime() > this.reserv.timeS.getTime()) {
      return true;
    } else {
      return false;
    }
  }

  filterChanged(selectedValue: string) {
    this.nbPlace();
  }

  choosePlace() {
    this.nbRepition();
    this.nbPlace();
    console.log('gggg1' , this.reserv.name );
    console.log('gggg2' , this.nombrePlaceDP);
    console.log('gggg3' , this.place);
    const dataa = {} as any;
    dataa.name = this.reserv.name;
    dataa.nbPDP = this.nombrePlaceDP;
    dataa.place = this.place;
    dataa.image = this.image;

    this.router.navigate(['/map'], {
      queryParams: {data: JSON.stringify(dataa)}
    });
    this.dialod.open(FooterComponent);
  }
  selectedplace(event){
    console.log("place!!!!!: "+event)
    this.placeSelected=event;
    let i=0
    for (i=0;i<this.listPlace.length;i++){
      console.log(this.listPlace[i])
      if (this.listPlace[i].name==this.placeSelected){
        this.adminId=this.listPlace[i].adminId
      }
    }
     console.log(" Place selected's adminId: "+this.adminId )

  }
  selectedpark(data){
    console.log("selectedPark is: "+  data)
    this.parkSelected=data
    this.parkService.getParkWithName(data).subscribe(data=>{
      const resSTR = JSON.stringify(data);
      const resJSON = JSON.parse(resSTR);
      this.data = resJSON;
      console.log(JSON.stringify(resJSON)  )
      this.adminId= JSON.stringify(resJSON[0].userId)

      console.log("adminId: "+this.adminId )


   this.listPlace=resJSON
   this.listPlace=[' ']
      let i=0;
      for (i;i<resJSON.length;i++){
        this.listPlace.push(resJSON[i])
      }
      console.log("listPlace: "+ this.listPlace)


    })


  }
  FilterChanged(selectedPrice: string) {

    this.selectedP=selectedPrice;
    this.parkService.makeReservation(this.selectedP)
    .subscribe( res=> {
      this.reserv.Tpark=res;
    });



  }
  Reservation(){
    this.userId= this.userId.substr(1,this.userId.length-2)
    console.log("userID from Map: "+this.userId)
    const data={
      park:this.parkSelected,
      place:this.placeSelected,
      dateD:this.reserv.dateE,
      dateF:this.reserv.dateS,
      timeD: this.reserv.timeE,
      timeF:this.reserv.timeS,
      Tpark:this.reserv.Tpark,
      matricule:this.reserv.matricule,
      userId:this.userId ,
      adminId:this.adminId}
    console.log("park: "+data.park+" place: "+data.place+ "mat: "+data.matricule)
    this.parkService.makeReservation(data)
    .subscribe(data =>
      {console.log("reservation data after : "+data) })
  }

}
