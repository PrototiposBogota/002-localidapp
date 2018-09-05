import { Component } from '@angular/core';
import {App, IonicPage, LoadingController, NavParams} from 'ionic-angular';
import {AlertReportPage} from "../alert-report/alert-report";
import {ApiProvider} from "../../providers/api/api";

/**
 * Generated class for the AlertListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alert-list',
  templateUrl: 'alert-list.html',
})
export class AlertListPage {

  alertTab: string;
  tab: number = 0;

  categories: any = {};
  path: any;

  constructor(
    public appCtrl: App,
    public navParams: NavParams,
    private apiProvider: ApiProvider,
    public loadingCtrl: LoadingController
  ) {
    this.alertTab = '';
    this.getData();
  }

  ionViewDidLoad() {

  }

  getData () {

    let loading = this.loadingCtrl.create({
      content: 'Cargando'
    });

    loading.present();

    this.apiProvider.getReportCategories()
      .subscribe((data: Array<object>) => {
        this.categories = data;
        loading.dismiss();
      });
  }

  switchTab (i: number){
    this.tab = i;
  }

  launchReport(id: number, name: string) {
    const data = {
      id: id,
      name: name
    };

    this.appCtrl.getRootNav().push(AlertReportPage, data);
  }

}
