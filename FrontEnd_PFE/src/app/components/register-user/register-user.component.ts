import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  registerUserData =  {} as any;
  listUser =  {} as any;
  valid = false;
  length = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.getListusers().subscribe((res) => {
      this.listUser = res;
    });
  }
  notValid() {
    console.log('password length', this.registerUserData.password.length);
    if (this.registerUserData.password.length < 8) {
      this.length = true;
    } else {
      this.length = false;
    }
  }
  registerUser() {
    this.notValid();
    const f = this.listUser.find(b => this.registerUserData.email === b.email);
    // tslint:disable-next-line:prefer-for-of
    if (f != null ) {
        console.log('Email valide');
        this.valid = true;
      } else {
        this.valid = false;
        if ( this.registerUserData.email || this.registerUserData.password || this.length === true ) {
          this.auth.registerUser(this.registerUserData)
          .subscribe(
            res => {
              this.router.navigate(['/loginuser']);
            },
            err => console.log(err)
          );
        }

    }




  }

}
