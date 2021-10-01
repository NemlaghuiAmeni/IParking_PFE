
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListparksComponent } from './listparks.component';
import { ListparksRoutingModule } from './listparks-routing/listparks-routing.module';
import { PipesModule } from 'pipes-module';
import { FilterparkIDPipe } from 'app/pipes/filterpark-id.pipe';
import { FilterparkNamePipe } from 'app/pipes/filterpark-name.pipe';



@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    PipesModule,
    ListparksRoutingModule
  ],
  declarations: [ListparksComponent,FilterparkIDPipe,FilterparkNamePipe],
  providers: []

})
export class ListparksModule { }
