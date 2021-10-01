import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import { environment } from 'environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl from 'mapbox-gl';
import {map} from 'rxjs/operators';
import AnimatedPopup from 'mapbox-gl-animated-popup';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forms',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public pageData;
  map:Mapboxgl.Map;
  private Latiude: number;
  private Longitude: number;
  parkUrl='/api/list/AllParking'
  marker : any ;
  constructor(router: Router, private route: ActivatedRoute,private http: HttpClient) {}
  private data1:  Array<any> ;
  public  test ;
  private data2:  Array<any> ;
  public  test2 ;
  private data3:  Array<any> ;
  public  test3 ;
  private l: Array <any>;
  private dev: Array <any>;
  ngOnInit() {
    this.showMap();
    this.http.post(this.parkUrl,
      {
      }).subscribe(data => {
      const resSTR = JSON.stringify(data);
      const resJSON = JSON.parse(resSTR);
      this.data1 = resJSON ;
      this.data1.forEach(item => {

        // create the popup
        const popup = new AnimatedPopup({
          offset: 20,
          openingAnimation: {
            duration: 1000,
            easing: 'easeOutBack'},
          closingAnimation: {
            duration: 300,
            easing: 'easeInBack'}}).setHTML(
          '<h2 class="text-info">' + item.name + '</h2>' + '<h5 class="text-basic"> ',
         // + 'Lignes : ' + item.lignesId.length + '</h5>',
        );
        new mapboxgl.Marker({ 'color': 'blue'}).setLngLat([item.longitude, item.latitude]).setPopup(popup).addTo(this.map);
      });

    });

  }

showMap(){
  (Mapboxgl as any).accessToken=environment.mapboxKey;
  (this.map) = new Mapboxgl.Map({
  container: 'map-mapbox', // container id
  style: 'mapbox://styles/mapbox/streets-v11',
  center:  [9.196506147691451 , 33.792635314317465], // Tunisia position
  zoom:6 // starting zoom
  });
(this.map).addControl(
    new MapboxGeocoder({
    countries:'tn',

    accessToken: Mapboxgl.accessToken,
    mapboxgl: (mapboxgl as any),
    placeholder: 'Enter an Address ',
    }))
    this.map.addControl(new Mapboxgl.NavigationControl());
    this.map.addControl(
      new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      trackUserLocation: true
      })
      );
}
createMarker(lng:number, lat:number){
  const marker=new Mapboxgl.Marker({
    draggable:true
  })
  .setLngLat([lng,lat])
  .addTo(this.map);
  marker.on('drag',() => {
    console.log(marker.getLngLat());
  })

}
}

