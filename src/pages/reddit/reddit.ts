import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {RedditApiService} from "../../providers/reddit/reddit-api-service";
import {HomePage} from "../home/home";
import {StatsPage} from '../stats/stats';

/**
 * Generated class for the RedditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reddit',
  templateUrl: 'reddit.html',
})
export class RedditPage {
  loadCompleted: boolean = false;
  public redditG: Array<any>;
  titleOfSearch;

  private redditPage = RedditPage;
  private homePage = HomePage;
  private statsPage = StatsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private redditApi: RedditApiService) {
    this.titleOfSearch = 'spacex/new';
    this.load(this.titleOfSearch);
  }

  load(url?) {
    this.redditApi.fetch(url).subscribe((data) => {
      this.redditG = data;
      this.loadCompleted = true;
    })
  }

  loadMore(infiniteScroll) {
    let lastPost = this.redditG[this.redditG.length - 1];
    if (!lastPost) {
      infiniteScroll.complete()
    } else {
      this.redditApi.fetchNext(lastPost.name, this.titleOfSearch).subscribe((posts) => {
        this.redditG = this.redditG.concat(posts);
        infiniteScroll.complete();
      })
    }
  }


  ionViewDidLoad() {
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
    if(event.direction === 2) {
      this.navCtrl.setRoot(this.homePage);
    }
  }
}
