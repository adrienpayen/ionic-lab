import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ILaunchsite, IRootObject} from "../../app/Models/ILaunch";



/*
  Generated class for the SpacexApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpacexApiProvider {
  private baseUrl = 'https://api.spacexdata.com/v2';

  constructor(private http: HttpClient) {
  }

  getAllLaunches(params: any): Observable<ILaunchsite[]> {
    const endpointUrl = `${this.baseUrl}/launches/all`;
    const httpParams = Object.getOwnPropertyNames(params).reduce((p, key) => p.set(key, params[key]), new HttpParams());
    return this.http.get<ILaunchsite[]>(endpointUrl, {params: httpParams});
  }

  getNextLaunch(): Observable<ILaunchsite> {
    const endpointUrl = `${this.baseUrl}/launches/next`;
    return this.http.get<ILaunchsite>(endpointUrl);
  }
}
