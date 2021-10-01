
import { NgModule } from '@angular/core';
import { AdminsRoutingModule } from './admins-routing/admins-routing.module';
import { AdminsComponent } from './admins.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [
    AdminsRoutingModule,
    FormsModule,
    CommonModule
  ],
  declarations: [ AdminsComponent ],
  providers: []
})
export class AdminsModule { }
