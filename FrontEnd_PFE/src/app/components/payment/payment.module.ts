
import { NgModule } from '@angular/core';
import { PaymentComponent } from './payment.component';
import { PaymentRoutingModule } from './payment-routing/payment-routing.module';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    PaymentRoutingModule,
    MatCardModule

  ],
  declarations: [ PaymentComponent ],
  providers: []
})
export class PaymentModule { }
