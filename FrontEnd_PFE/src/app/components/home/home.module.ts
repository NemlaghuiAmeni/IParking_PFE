
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing/home-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DatepickerModule, DatepickerComponent } from 'ng2-datepicker';

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot(),
    TranslateModule.forRoot(),
    DatepickerModule,
    HomeRoutingModule
],
  declarations: [ HomeComponent],
  providers: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
