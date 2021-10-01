import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { MapRoutingModule } from './map-routing/map-routing.module';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    MapRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDIlFA3KpOdfvbXjHuUOHsiO31QNmm5LHE'
    })
  ],
  declarations: [ MapComponent ],
  providers: []
})
export class MapModule { }
