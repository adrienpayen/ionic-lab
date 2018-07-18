import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ILaunchsite, IRootObject} from "../../app/Models/ILaunch";
import {IRocket} from "../../app/Models/IRocket";
import { ICompany } from '../../app/Models/ICompany';


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

  /* Launch Data */

  getAllLaunches(params: any): Observable<IRootObject[]> {
    const endpointUrl = `${this.baseUrl}/launches/all`;
    const httpParams = Object.getOwnPropertyNames(params).reduce((p, key) => p.set(key, params[key]), new HttpParams());
    return this.http.get<IRootObject[]>(endpointUrl, {params: httpParams});
  }

  getNextLaunch(): Observable<IRootObject> {
    const endpointUrl = `${this.baseUrl}/launches/next`;
    return this.http.get<IRootObject>(endpointUrl);
  }

  getUpcomingLaunches(params: any): Observable<IRootObject[]> {
    const endpointUrl = `${this.baseUrl}/launches/upcoming`;
    const httpParams = Object.getOwnPropertyNames(params).reduce((p, key) => p.set(key, params[key]), new HttpParams());
    return this.http.get<IRootObject[]>(endpointUrl, {params: httpParams});
  }

  getPastLaunches(params: any): Observable<IRootObject[]> {
    const endpointUrl = `${this.baseUrl}/launches`;
    const httpParams = Object.getOwnPropertyNames(params).reduce((p, key) => p.set(key, params[key]), new HttpParams());
    return this.http.get<IRootObject[]>(endpointUrl, {params: httpParams});
  }

  /* Rocket data */

  getAllRockets(params: any): Observable<IRocket[]> {
    const endpointUrl = `${this.baseUrl}/rockets`;
    const httpParams = Object.getOwnPropertyNames(params).reduce((p, key) => p.set(key, params[key]), new HttpParams());
    return this.http.get<IRocket[]>(endpointUrl, {params: httpParams});
  }

  getCapusle(params: any): Observable<IRootObject> {
    const endpointUrl = `${this.baseUrl}/capsules/`;
    const httpParams = Object.getOwnPropertyNames(params).reduce((p, key) => p.set(key, params[key]), new HttpParams());
    return this.http.get<IRootObject>(endpointUrl);
  }

  /* Company data */
  getCompany(): Observable<ICompany> {
    const endpointUrl = `${this.baseUrl}/info`;
    return this.http.get<ICompany>(endpointUrl);
  }

  getCompanyHistory(): Observable<IRootObject> {
    const endpointUrl = `${this.baseUrl}/info/history`;
    return this.http.get<IRootObject>(endpointUrl);
  }
}
