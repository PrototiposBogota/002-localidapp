import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  private latSource = new BehaviorSubject(0);
  private lngSource = new BehaviorSubject(0);

  currentLat = this.latSource.asObservable();
  currentLng = this.lngSource.asObservable();

  constructor(public http: HttpClient) {

  }
  geolocation (lat: number, lng:number ) {
    this.latSource.next(lat);
    this.lngSource.next(lng);
  }
}
