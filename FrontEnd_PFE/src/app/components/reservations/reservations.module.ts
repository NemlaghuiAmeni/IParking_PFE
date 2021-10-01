import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {ChartsModule} from 'ng2-charts';
import { ReservationsComponent } from './reservations.component';
import { ReservationsRoutingModule } from './reservations-routing/reservations-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterResPipe } from 'app/pipes/filter-res.pipe';
import { FilterMatPipe } from 'app/pipes/filter-mat.pipe';
@NgModule({
  imports: [
    ReservationsRoutingModule, ChartsModule,FormsModule,CommonModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot()
  ],
  declarations: [  ReservationsComponent,FilterResPipe,FilterMatPipe  ],
  providers: []
})
export class  ReservationsModule { }
