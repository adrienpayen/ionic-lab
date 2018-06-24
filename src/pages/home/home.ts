import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SpacexApiProvider} from "../../providers/spacex-api/spacex-api";
import {ILaunchsite} from "../../app/Models/ILaunch";
import {Observable} from 'rxjs/Observable';
import {LaunchPage} from '../launch/launch';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private allLaunches: ILaunchsite[];
  private nextLaunch: ILaunchsite;

  constructor(public navCtrl: NavController, public navParams: NavParams, private spacexApi: SpacexApiProvider) {

    this.spacexApi.getAllLaunches({order: 'desc'}).subscribe(data => {
      this.allLaunches = data;
    });

    this.spacexApi.getNextLaunch().subscribe(  data => {
      this.nextLaunch = data;
    });


  }

  /**
   *
   * @param flight_number
   * Get launch page by its ID
   */
  public readMore(flight_number: any) {
    this.navCtrl.push(LaunchPage, { flight_number: flight_number});
  }

}
