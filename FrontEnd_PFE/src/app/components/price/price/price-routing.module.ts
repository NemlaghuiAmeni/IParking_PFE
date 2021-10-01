import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PriceComponent } from '../price.component';
import { PriceModule } from './price.module';
import { PriceService } from 'app/services/services/price.service';
const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: PriceComponent,
  data: {
  }
},{
  path: 'subpage',
  pathMatch: 'full',
  component: PriceComponent,
  data: {
    title: 'Subpage Tables Works'
  }
}];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class PriceRoutingModule { }


