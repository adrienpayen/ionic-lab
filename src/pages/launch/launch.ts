import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SpacexApiProvider} from "../../providers/spacex-api/spacex-api";

import {ILaunchsite, IRootObject} from "../../app/Models/ILaunch";
import {IRocket} from "../../app/Models/IRocket";
import { RocketPage } from '../rocket/rocket';

/**
 * Generated class for the LaunchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-launch',
  templateUrl: 'launch.html',
})
export class LaunchPage {

  private launch: IRootObject;
  private rocket: IRocket;
  private capsule: IRootObject;


  constructor(public navCtrl: NavController, public navParams: NavParams, private spacexApi: SpacexApiProvider) {

    this.spacexApi.getAllLaunches({'flight_number': navParams.get('flight_number')}).subscribe(data => {
      this.launch = data[0];
    });

  }

  public readMoreByRocketName(id: any) {
    this.spacexApi.getAllRockets(id).subscribe(data => {
      this.rocket = data[0];
      this.navCtrl.push(RocketPage, { rocket_id: this.rocket.rocket_id});
    })
  }

}
