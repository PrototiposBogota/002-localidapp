import { Component } from '@angular/core';
import {App, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {DataProvider} from "../../providers/data/data";
import {ApiProvider} from "../../providers/api/api";
import {MapPage} from "../map/map";

/**
 * Generated class for the AlertReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alert-report',
  templateUrl: 'alert-report.html',
})
export class AlertReportPage {

  id:number;
  name: string;
  lat:number;
  lng: number;
  comment: string;
  response: boolean = false;
  takenPhoto: boolean = false;
  public photo: any='';
  imageToSend:any;

  constructor(
    public navCtrl: NavController,
    public appCtrl: App,
    public navParams: NavParams,
    private data: DataProvider,
    private apiProvider: ApiProvider,
    private camera: Camera,
    public loadingCtrl: LoadingController
  ) {
    this.id = this.navParams.get('id');
    this.name = this.navParams.get('name');
    console.log(this.id)
  }

  ionViewDidLoad() {
    this.data.currentLat.subscribe(lat => this.lat = lat);
    this.data.currentLng.subscribe(lng => this.lng = lng);
  }

  openCamera () {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 600,
      targetHeight: 600
    };

    this.camera.getPicture(options)
      .then((imageData) => {
        this.photo = 'data:image/jpeg;base64,' + imageData;
        this.takenPhoto = true;
        // this.imageToSend = imageData
      }, (err) => {
        console.log(err)
      });
  }

  doReport () {

    let loading = this.loadingCtrl.create({
      content: 'Guardando datos'
    });

    loading.present();

    let params = {
      pid : this.id,
      latitude: this.lat,
      longitude: this.lng,
      comment: this.comment,
      picture: this.photo,
      check: false,
    };

    this.apiProvider.postReport(params).subscribe(
      data => {
        loading.dismiss();
        if (data.success = true) {
          this.response = true;
          console.log('subscrito', data);
          setTimeout(() =>{
            this.navCtrl.setRoot(MapPage);
          }, 1500);
        } else{

        }

        return true;
      },
      error => {
        loading.dismiss();
        console.log('error subscribción', error)
      }
    )
  }



}
