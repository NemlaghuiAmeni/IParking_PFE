import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AddParkComponent } from '../add-park.component';
import { Title } from '@angular/platform-browser';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AddParkComponent,
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
export class AddParkRoutingModule { }
