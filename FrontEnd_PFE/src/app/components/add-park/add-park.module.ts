
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddParkRoutingModule } from './add-park-routing/parks-routing.module';
import { AddParkComponent } from './add-park.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    AddParkRoutingModule,
    ReactiveFormsModule,
    ToastNoAnimationModule.forRoot(),

  ],
  declarations: [ AddParkComponent ],
  providers: []
})
export class AddParkModule { }
