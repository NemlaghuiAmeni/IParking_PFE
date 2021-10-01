import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceRoutingModule } from './price-routing.module';
import { PriceComponent } from '../price.component';
import { FilterIDPipe } from 'app/pipes/filter-id.pipe';
import { FilterNamePipe } from 'app/pipes/filterName.pipe';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  imports: [
    PriceRoutingModule,
    MatCardModule


  ],
  declarations: [],
  providers: []

})
export class PriceModule { }




