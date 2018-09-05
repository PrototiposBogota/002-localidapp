import {Component, ViewChild} from '@angular/core';
import { App } from 'ionic-angular/components/app/app';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {MapPage} from "../pages/map/map";
import {ArticleListPage} from "../pages/article-list/article-list";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MapPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public appCtrl: App) {

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.platform.registerBackButtonAction(() => {
        appCtrl.navPop();
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });


    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'YO SE', component: ArticleListPage},
      {title: 'Términos y condiciones', component: ''},
      {title: 'Configuración', component: ''},
      {title: 'Ayuda', component: ''}
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component);
    this.appCtrl.getRootNav().push(page.component);
  }
}
