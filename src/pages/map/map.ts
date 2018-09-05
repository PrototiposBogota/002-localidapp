import {Component, ViewChild} from '@angular/core';
import {App, IonicPage, Nav, NavController, ViewController} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
import {AlertListPage} from "../alert-list/alert-list";
import {DataProvider} from "../../providers/data/data";
import {ApiProvider} from "../../providers/api/api";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions, GoogleMapsEvent, Marker
} from '@ionic-native/google-maps';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild(Nav) nav: NavController;

  map: GoogleMap;

  lat: number;
  lng: number;

  markers: any = [];

  constructor(
    private geolocation: Geolocation,
    public viewCtrl: ViewController,
    private api: ApiProvider,
    public appCtrl: App,
    private data: DataProvider
) {
}

/**
 * @TODO
 *
 * For iOS you have to add this configuration to your configuration.xml file
 *
 * <edit-config file="*-Info.plist" mode="merge" target="NSLocationWhenInUseUsageDescription">
 <string>We want your location! Best regards NSA</string>
 </edit-config>
 */

ionViewDidLoad() {
  this.getGeolocation();
  this.getMarkers();
}
ionViewWillEnter() {
  this.getGeolocation()
}

  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;

      this.loadMap();
      console.log(this.lat, this.lng);
    }).catch((error) => {
      // alert('Hubo un error obteniendo la ubicación');
      console.log('Hubo un error obteniendo la ubicación', error);
    });
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.lat,
          lng: this.lng
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: this.lat,
        lng: this.lng
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });

  }

  getMarkers () {
    this.api.getMarkers()
      .subscribe((data: Array<object>) => {
        this.markers = data;
        console.log(this.markers.reports)
      });
  }
  doReport() {
    // this.viewCtrl.dismiss();
    this.getGeolocation();

    this.data.geolocation(this.lat, this.lng);
    this.appCtrl.getRootNav().push(AlertListPage);
  }

  filterTrash () {

  }
}
