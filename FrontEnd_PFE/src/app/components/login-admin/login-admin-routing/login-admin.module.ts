import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginAdminRoutingModule } from './login-admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginAdminRoutingModule
  ]
})
export class LoginAdminModule { }
