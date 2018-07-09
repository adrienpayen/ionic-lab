import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import {SpacexApiProvider} from "../../providers/spacex-api/spacex-api";
import {ILaunchsite, IRootObject} from "../../app/Models/ILaunch";
import {IRocket} from "../../app/Models/IRocket";
import {Observable} from 'rxjs/Observable';
import {LaunchPage} from '../launch/launch';
import {CalendarModal,CalendarModalOptions,CalendarComponentOptions } from 'ion2-calendar';

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
  private recentOn: boolean;
  private successOn: boolean;
  private failOn: boolean;

  
  private dateRange: {
    from: Date;
    to: Date
  } = {
    from: new Date(2006, 1, 1),
    to: new Date(2050,1, 1)
  };

  private options: CalendarModalOptions = {
    pickMode: 'range',
    title: 'Launch Dates',
    from: new Date(2006, 1, 1),
    defaultDate: new Date(),
    defaultScrollTo: new Date(Date.now())
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private spacexApi: SpacexApiProvider, public modalController: ModalController) {
    this.timerOn = 1;
    this.filtersOn = 0;
    this.launches = "all";
    this.rocketId = "all";
    this.recentOn = true;
    this.successOn = true;
    this.failOn = true;

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
   * Get launch page by its ID
   * @param flight_number
   */
  public readMore(flight_number: any) {
    this.navCtrl.push(LaunchPage, { flight_number: flight_number});
  }

  /**
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

  /**
   * Show/Hide filters
   */
  public showFilters() {
    if(this.filtersOn) {
      this.filtersOn = 0;
    } else {
      this.filtersOn = 1;
    }
  }

  /**
   * Update lists with order DESC / ASC on "Recent" filter
   * @param value 
   */
  public getMostRecentsOn(value) { 
    if(value) {
      this.spacexApi.getAllLaunches({order: 'desc'}).subscribe(data => {
        this.allLaunches = data;
      });    

      this.spacexApi.getUpcomingLaunches({order: 'desc'}).subscribe(  data => {
        this.upcomingLaunches = data;
      });
      
      this.spacexApi.getPastLaunches({order: 'desc'}).subscribe(  data => {
        this.pastLaunches = data;
      });
    } else {
      this.spacexApi.getAllLaunches({}).subscribe(data => {
        this.allLaunches = data;
      });

      this.spacexApi.getUpcomingLaunches({}).subscribe(  data => {
        this.upcomingLaunches = data;
      });
      
      this.spacexApi.getPastLaunches({}).subscribe(  data => {
        this.pastLaunches = data;
      });
    }
  }

  public openCalendar() {
    let myCalendar = this.modalController.create(CalendarModal, {
      options: this.options
    });

    myCalendar.present();

    myCalendar.onDidDismiss((date, type) => {
      if (type === 'done') {
        this.spacexApi.getAllLaunches({start: date.from.string, final: date.to.string}).subscribe(data => {
          this.allLaunches = data;
        });    
  
        this.spacexApi.getUpcomingLaunches({start: date.from.string, final: date.to.string}).subscribe(  data => {
          this.upcomingLaunches = data;
        });
        
        this.spacexApi.getPastLaunches({start: date.from.string, final: date.to.string}).subscribe(  data => {
          this.pastLaunches = data;
        });
      }
    });
  }

}
