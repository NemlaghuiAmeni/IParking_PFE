
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardPaymentRoutingModule } from './cardPayment-routing/parks-routing.module';
import { CardPaymentComponent } from './cardPayment.component';

@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    CardPaymentRoutingModule,
  ],
  declarations: [ CardPaymentComponent ],
  providers: []
})
export class CardPaymentModule { }
