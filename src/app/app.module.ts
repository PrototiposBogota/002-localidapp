import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {MapPage} from "../pages/map/map";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from "@ionic-native/geolocation";

import {AgmCoreModule} from "@agm/core";
import {AlertListPage} from "../pages/alert-list/alert-list";
import {HttpClientModule} from "@angular/common/http";
import { DataProvider } from '../providers/data/data';
import {AlertReportPage} from "../pages/alert-report/alert-report";
import {Camera} from "@ionic-native/camera";
import { ApiProvider } from '../providers/api/api';
import {ArticleListPage} from "../pages/article-list/article-list";
import {ArticlePage} from "../pages/article/article";
import {AgmSnazzyInfoWindowModule} from "@agm/snazzy-info-window";
import {GoogleMaps} from "@ionic-native/google-maps";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MapPage,
    AlertListPage,
    AlertReportPage,
    ArticleListPage,
      ArticlePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAMyLOL3-FX-AEeoZWyMS7gJpi7G-FJDUk'
    }),
    HttpClientModule,
    AgmSnazzyInfoWindowModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MapPage,
    AlertListPage,
    AlertReportPage,
    ArticleListPage,
      ArticlePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Camera,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    ApiProvider
  ]
})
export class AppModule {}
