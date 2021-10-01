
import { NgModule } from '@angular/core';
import { PaypalComponent } from './paypal.component';
import { PaypalRoutingModule } from './paypal-routing/paypal-routing.module';
@NgModule({
  imports: [
    PaypalRoutingModule  ],
  declarations: [PaypalComponent ],
  providers: []
})
export class PaypalModule { }
