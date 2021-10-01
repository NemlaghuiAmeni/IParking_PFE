import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {User} from 'app/models/user'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {


  loginUserData = {} as any;
  listUser = {} as any;
  list = {} as any;
  incorrect = false;
  data;


  constructor(private auth: AuthService, private router: Router,private http:HttpClient) { }


  ngOnInit(): void {

    this.auth.getListusers().subscribe((res) => {
      this.listUser = res;
    });
  }



  loginUser() {

  /*  if (this.loginUserData.email === 'admin' && this.loginUserData.password === 'admin' ) {
          localStorage.setItem('role', 'supA');
          this.router.navigate(['/gpark']);

    }*/
    // tslint:disable-next-line:prefer-for-of

    console.log("testLogin")
    this.http.post("/api/list/curentUser", { email: this.loginUserData.email }).subscribe(data => {
      const resSTR = JSON.stringify(data);
      const resJSON = JSON.parse(resSTR);
      this.data = resJSON;

      console.log('curentUser: ' +  JSON.stringify(resJSON[0]._id))
      localStorage.setItem('userId',  JSON.stringify(resJSON[0]._id));
 localStorage.setItem('admin',  "true");

    });

    this.auth.loginSUP(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', 'superviseur');
        localStorage.setItem('roles', JSON.stringify(res));
        localStorage.setItem('role', 'sup');

        this.router.navigate(['/dashboard']);
        this.incorrect = false;

      },
      err => console.log(err)
    );
    this.auth.loginAdmin(this.loginUserData)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('name', 'admin');
          localStorage.setItem('roles', JSON.stringify(res));
          localStorage.setItem('role', 'admin');
          this.router.navigate(['/dashboard']);
          this.incorrect = false;
        },
        err => console.log(err)
      );

    this.auth.loginSUPA(this.loginUserData)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('name', this.loginUserData.email);

          localStorage.setItem('role', 'supA');
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'You are logged in successfully ',
            showConfirmButton: false,
            timer: 1300,
          });
          this.router.navigate(['/dashboard']);
          this.incorrect = false;
        },
        err =>
        console.log(err),


        );







  }

}
