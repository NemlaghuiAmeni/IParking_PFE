import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AdminsComponent } from '../admins.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AdminsComponent,
    data: {
    }
  }
];
@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
})
export class AdminsRoutingModule { }
