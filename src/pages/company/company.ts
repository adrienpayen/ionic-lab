import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import { SpacexApiProvider } from '../../providers/spacex-api/spacex-api';
import { ICompany, ICompanyHistory } from '../../app/Models/ICompany';

/**
 * Generated class for the CompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company',
  templateUrl: 'company.html',
})
export class CompanyPage {
  private company: ICompany;
  private history: ICompanyHistory;

  constructor(public navCtrl: NavController, public navParams: NavParams, private spacexApi: SpacexApiProvider) {
    this.spacexApi.getCompany().subscribe(data => {
      this.company = data;
    });

    this.spacexApi.getCompanyHistory({order: 'desc'}).subscribe(data => {
      this.history = data;
      console.log(this.history)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyPage');
  }

}
