import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";

/**
 * Generated class for the ArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-article',
    templateUrl: 'article.html',
})
export class ArticlePage {
    id: number;
    article: any;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private apiProvider: ApiProvider,
        public loadingCtrl: LoadingController
    ) {
        this.id = this.navParams.get('id');
        console.log(this.id);
        this.getData(this.id);
    }

    getData(id) {
        let loading = this.loadingCtrl.create({
            content: 'Cargando'
        });

        loading.present();

        this.apiProvider.getArticle(id)
            .subscribe((data: Array<object>) => {
                this.article = data;
                console.log(this.article)
                loading.dismiss();
            });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ArticlePage');
    }

}
