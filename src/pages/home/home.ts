import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SpacexApiProvider} from "../../providers/spacex-api/spacex-api";
import {ILaunchsite} from "../../app/Models/ILaunch";


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  allLaunches: ILaunchsite[];
  nextLaunch: ILaunchsite[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private spacexApi: SpacexApiProvider) {


    this.spacexApi.getAllLaunches({order: 'desc'}).subscribe(data => {
      this.allLaunches = data;
    });

    this.spacexApi.getNextLaunch().subscribe(  data => {
         this.nextLaunch = data;
         console.log(this.nextLaunch)
    });
  }

  /**
   *
   * @param id
   * You get launcher id with this method
   */
  public readMore(id: any) {
    this.spacexApi.getAllLaunches({'flight_number': id}).subscribe(data => {
      console.log(data)
    });
  }

}
