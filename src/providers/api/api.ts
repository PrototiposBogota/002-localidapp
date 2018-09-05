import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";


/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }


  apiUrl: any = 'http://milocalidad.indyprojects.com/';


  public getMarkers (){
    return this.http.get(this.apiUrl + 'api/reports/all')
      .map(data => {
        return data;
      })
  }

  /**
   * get all Report Categories
   * @returns {Observable<any>}
   */

  public getReportCategories (){
    return this.http.get(this.apiUrl + 'api/problematics')
      .map(data => {
        return data;
      })
  }
    public getArticles (){
        return this.http.get(this.apiUrl + 'api/articles')
            .map(data => {
                return data;
            })
    }
    public getArticle (id){
        return this.http.get(this.apiUrl + 'api/article/'+id)
            .map(data => {
                return data;
            })
    }

  /**
   * Do report
   * @param data
   * @returns {Observable<any>}
   */

  public postReport (data): Observable<any>{

    console.log(data);

    const body: FormData = new FormData();
    body.append('pid',data.pid);
    body.append('comment',data.comment);
    body.append('picture',data.picture);
    body.append('latitude',data.latitude);
    body.append('longitude',data.longitude);
    // body.append('check',data.check);

    const httpOptions = {
      headers: new HttpHeaders({

      }),
      mimeType: 'multipart/form-data',
      contentType: false,
    };

    return this.http
      .post(this.apiUrl + 'reportes/registrar', body, httpOptions)
      .pipe(map(Response => {
        return Response;
      }));
  }
}
