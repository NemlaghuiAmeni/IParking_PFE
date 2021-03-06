import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { ContactComponent } from '../contact.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ContactComponent,
    data: {
      title: ''
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
export class ContactRoutingModule { }
