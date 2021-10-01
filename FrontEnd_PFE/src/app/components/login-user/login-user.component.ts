import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'app/services/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  loginUserData = {} as any;
  listUser = {} as any;
  list = {} as any;
  incorrect = false;
data:any
constructor(private auth: AuthService, private router: Router, private http: HttpClient) { }


ngOnInit(): void {
localStorage.setItem('admin',  "false");
  this.auth.getListusers().subscribe((res) => {
    this.listUser = res;

    localStorage.setItem("userId", this.listUser[1]._id)
    console.log("userList: " + this.listUser[1]._id)
  });
}



loginUser() {
  console.log("current Email: "+this.loginUserData.email)
  this.http.post("/api/list/curentSimpleUser", { email: this.loginUserData.email }).subscribe(data => {
    const resSTR = JSON.stringify(data);
    const resJSON = JSON.parse(resSTR);
    this.data = resJSON;
    console.log('curentUserID: ' +  JSON.stringify(resJSON[0]._id))
    localStorage.setItem('userId',  JSON.stringify(resJSON[0]._id));
console.log("UserId: "+ JSON.stringify(resJSON[0]._id))

  });
  // tslint:disable-next-line:prefer-for-of

  this.auth.loginUser(this.loginUserData)
    .subscribe(
      res => {

        localStorage.setItem('token', res.token);
        localStorage.setItem('name', this.loginUserData.email);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Welcome to IParking',
          showConfirmButton: false,
          timer: 1300,
        });
        this.router.navigate(['/home']);
        localStorage.setItem('role', 'user');
        this.incorrect = false;
      },
      err => console.log(err)
    );

}

}
