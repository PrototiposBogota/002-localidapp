import {Component} from '@angular/core';
import {App, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {ArticlePage} from "../article/article";

/**
 * Generated class for the ArticleListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-article-list',
    templateUrl: 'article-list.html',
})
export class ArticleListPage {
    path: any;
    tab: number = 0;
    alertTab: string;
    category_articles: any;

    constructor(
        public appCtrl: App,
        public navCtrl: NavController,
        public navParams: NavParams,
        private apiProvider: ApiProvider,
        public loadingCtrl: LoadingController
    ) {
        this.alertTab = '';
        this.getData();
    }

    getData () {

        let loading = this.loadingCtrl.create({
            content: 'Cargando'
        });

        loading.present();

        this.apiProvider.getArticles()
            .subscribe((data: Array<object>) => {
                this.category_articles = data;
                loading.dismiss();
            });
    }

    switchTab (i: number){
        this.tab = i;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ArticleListPage');
    }
    routeArticle(id: number){
        console.log(id);
        this.appCtrl.getRootNav().push(ArticlePage, {id: id});
    }
}
