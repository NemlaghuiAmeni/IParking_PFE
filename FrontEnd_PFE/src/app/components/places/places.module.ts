
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacesRoutingModule } from './places-routing/places-routing.module';
import { PlacesComponent } from './places.component';
import { FilterIDPipe } from 'app/pipes/filter-id.pipe';
import { FilterNamePipe } from 'app/pipes/filterName.pipe';

@NgModule({
  imports: [
    PlacesRoutingModule,
    CommonModule,
    FormsModule

  ],
  declarations: [ PlacesComponent,FilterIDPipe,FilterNamePipe ],
  providers: []

})
export class PlacesModule { }
