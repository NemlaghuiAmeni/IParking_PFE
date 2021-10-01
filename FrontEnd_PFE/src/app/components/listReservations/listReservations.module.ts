
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListReservationsComponent } from './listReservations.component';
import { ListReservationsRoutingModule } from './listReservations-routing/listReservations-routing.module';

@NgModule({
  imports: [
    ListReservationsRoutingModule,
    NgbModule,
    FormsModule,
    CommonModule
  ],
  declarations: [  ListReservationsComponent ],
  providers: []
})
export class  ListReservationsModule { }
