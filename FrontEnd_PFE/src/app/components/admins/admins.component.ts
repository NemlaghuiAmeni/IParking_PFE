import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import { AuthService } from 'app/services/services/auth.service';
import { ParkService } from 'app/services/services/park.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-forms',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {
  public pageData;

  registerUserData =  {} as any;
  listAdmin = {} as any ;
  data = [] as any ;
  park = {} as any ;
  reserv = {} as any ;
  keyword = 'name';
  selected: string;
  role = '';
  selecteds = '';
  userId;
  marker = {} as any;
  constructor(private auth: AuthService, private router: Router, private parkService: ParkService) {
    this.parkService.listen().subscribe((m:any)=>{
      console.log(m);
      this.refreshList();
  })
  }
  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    const s = localStorage.getItem('role');
    const ss = JSON.parse(localStorage.getItem('roles'));

    if ( s === 'sup' || s === 'admin' ) {
      this.selected = ss.user.parking;
      console.log('' , ss.user.parking);
      this.parkService.getByNamep(this.selected).subscribe((res) => {
        this.data = res;
      });
    } else {

      this.parkService.getListPark(" ").subscribe((res) => {
        this.data = res;
      });
    }
    this.auth.getListuser().subscribe((res) => {
      this.listAdmin = res;
    });
    this.resetForm();


  }

  resetForm() {
    this.registerUserData.email='';
    this.registerUserData.password='';
    this.registerUserData.role='';
  }


  registerUser() {
    console.log('rrrr' , this.selecteds);
    if (this.selecteds === 'sup') {
      this.auth.registerSup(this.registerUserData)
      .subscribe(
        res => {
          this.router.navigate(['/add-admin']);

        },
        err => console.log(err)
      );

    } else if (this.selecteds === 'admin') {
      this.registerUserData.parking = this.park.name;
      this.auth.registerAdmin(this.registerUserData)
      .subscribe(
        res => {
          this.router.navigate(['/add-admin']);
        },
        err => console.log(err)
      );
      this.parkService.savePark(this.park).subscribe(
        res => {
            this.ngOnInit();
        },
        err => console.log(err)
    );
    } else {
      this.auth.registerSupA(this.registerUserData)
      .subscribe(
        res => {
          this.parkService.filter('Register click');
          this.router.navigate(['/add-admin']);
        },
        err => console.log(err)
      );
    }


  }
  refreshList() {
    const s = localStorage.getItem('role');
    const ss = JSON.parse(localStorage.getItem('roles'));
    if ( s === 'sup' || s === 'admin' ) {
      this.selected = ss.user.parking;
      console.log('rrr' , ss.user.parking);
      this.parkService.getByNamep(this.selected).subscribe((res) => {
        this.marker = res;
      });
      console.log('marker', this.marker);
    } else {

      this.parkService.getListPark(this.userId.substr(1,this.userId.length-2)).subscribe((res) => {
        this.marker = res;
      });
    }

  }
  // tslint:disable-next-line:variable-name
  onDeletee(_id: string) {
    if (confirm('Do you really want to delete this Admin ?') === true) {
      this.auth.deletePark(_id).subscribe((res) => {
        this.ngOnInit();
      });
    }
  }
  filterChanged(event) {
    this.selecteds = event;
    console.log('rrrr' , this.selecteds);

  }
  selectEvent(item) {
    console.log(item.name);
    this.registerUserData.parking = item.name;

}

onChangeSearch(val: string) {

  // fetch remote data from here
  // And reassign the 'data' which is binded to 'data' property.
}

onFocused(e) {
  console.log('focus');

}

}
