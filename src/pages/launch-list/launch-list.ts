import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SpacexApiProvider} from "../../providers/spacex-api/spacex-api";
import {ILaunchsite} from "../../app/Models/ILaunch";


/**
 * Generated class for the LaunchListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-launch-list',
  templateUrl: 'launch-list.html',
})
export class LaunchListPage {

  launches: ILaunchsite[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private spacexApi: SpacexApiProvider) {
    this.spacexApi.getAllLaunches({order: 'desc'}).subscribe(data => {
      this.launches = data;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LaunchListPage');
  }

}
