import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SpacexApiProvider } from '../../providers/spacex-api/spacex-api';

/**
 * Generated class for the RocketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rocket',
  templateUrl: 'rocket.html',
})
export class RocketPage {
  private rocket;

  constructor(public navCtrl: NavController, public navParams: NavParams, private spacexApi: SpacexApiProvider) {
    /*this.spacexApi.getAllRockets({order: 'desc'}).subscribe(data => {
      this.rockets = data;
    });*/

    this.spacexApi.getAllRockets({'id': navParams.get('rocket_id')}).subscribe(data => {
      this.rocket = data[0];
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RocketPage');
  }

}
