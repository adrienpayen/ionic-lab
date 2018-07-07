import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SpacexApiProvider} from "../../providers/spacex-api/spacex-api";
import {ILaunchsite, IRootObject} from "../../app/Models/ILaunch";
import {IRocket} from "../../app/Models/IRocket";
import {Observable} from 'rxjs/Observable';
import {LaunchPage} from '../launch/launch';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private allLaunches: IRootObject[];
  private upcomingLaunches: IRootObject[];
  private pastLaunches: IRootObject[];
  private nextLaunch: IRootObject;

  private allRockets: IRocket[];

  private missionName: string;
  private rocketId: string;

  private launches: string;
  private timerOn: number;
  private filtersOn: number;
  private dateRange: any = { lower: 0, upper: 100 };
  private recentOn: number;
  private successOn: number;
  private failOn: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private spacexApi: SpacexApiProvider) {
    this.timerOn = 1;
    this.filtersOn = 0;
    this.launches = "all";
    this.rocketId = "all";
    this.recentOn = 1;
    this.successOn = 1;
    this.failOn = 1;

    this.spacexApi.getAllLaunches({order: 'desc'}).subscribe(data => {
      this.allLaunches = data;
    });

    this.spacexApi.getNextLaunch().subscribe(  data => {
      this.nextLaunch = data;
      this.checkTimer();
    });

    this.spacexApi.getUpcomingLaunches({order: 'desc'}).subscribe(  data => {
      this.upcomingLaunches = data;
    });
    
    this.spacexApi.getPastLaunches({order: 'desc'}).subscribe(  data => {
      this.pastLaunches = data;
    });

    this.spacexApi.getAllRockets({}).subscribe(  data => {
      this.allRockets = data;
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

  /**
   * 
   * Check timer countdown to replace with a live button
   */
  public checkTimer() {
    let today = new Date();
    today.setSeconds(today.getSeconds() + 1);
    let launchDate = new Date();

    if(this.nextLaunch) {
      launchDate = new Date(this.nextLaunch.launch_date_local);
    }

    if(launchDate <= today) {
      this.timerOn = 0;
    }
  }

  public showFilters() {
    if(this.filtersOn) {
      this.filtersOn = 0;
    } else {
      this.filtersOn = 1;
    }
  }

}
