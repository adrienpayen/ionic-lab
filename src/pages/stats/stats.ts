import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";
import { RedditPage } from '../reddit/reddit';
import {SpacexApiProvider} from "../../providers/spacex-api/spacex-api";
import {IRootObject} from "../../app/Models/ILaunch";
import {IRocket} from "../../app/Models/IRocket";

/**
 * Generated class for the StatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public rocketLabels: string[];
  public rocketData: any[];
  
  private allLaunches: IRootObject[];
  private allRockets: any[];

  private homePage = HomePage;
  private redditPage = RedditPage;
  private rockets;
  private i: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private spacexApi: SpacexApiProvider) {
    this.i = 0;
    let allLaunches;
    let allRockets;
    this.rockets = [];
    this.rocketLabels = [];
    this.rocketData = [{data: [], label: ''}];
    let totalLaunches = 0;

    let promise1 = new Promise(function(resolve, reject) {
      spacexApi.getAllLaunches({order: 'desc'}).subscribe(data => {
        resolve(data);
      });
    });

    let promise2 = new Promise(function(resolve, reject) {
      spacexApi.getAllRockets({}).subscribe(  data => {
        resolve(data);
      });
    });

    Promise.all([promise1, promise2]).then(data => {
      let launches = data[0];
      let rockets = data[1];
      let statRocket = [];
      let statData = [];
      
      // Launches per Rocket
      launches.forEach(launch => {
        if(launch.launch_success != undefined) {
          let rocketName = launch.rocket.rocket_id;
          if(statRocket[rocketName]) {
            statRocket[rocketName] += 1;
          } else {
            statRocket[rocketName] = 1;
          }
        }
      });

      rockets.forEach(rocket => {
        this.rocketLabels[this.i++] = rocket.id;
        if(statRocket[rocket.id]) {
          statData.push(statRocket[rocket.id]);
        }
      });

      this.rocketData = [
        {data: statData, label: 'Rockets'}
      ];

    });

  }


  /**
   * 
   * @param page Open a page
   */
  public openPage(page) {
    this.navCtrl.setRoot(page);
  }

  /**
   * 
   * @param event 
   */
  public swipe(event) {
    // Left
    if(event.direction === 2) {
      this.navCtrl.setRoot(this.homePage);
    }
  }

}
