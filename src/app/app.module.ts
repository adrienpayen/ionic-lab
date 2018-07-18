import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CountDown } from "ng4-date-countdown-timer";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LaunchPage } from '../pages/launch/launch';
import { RedditPage } from "../pages/reddit/reddit";
import { CompanyPage } from "../pages/company/company";
import { StatsPage } from "../pages/stats/stats";
import { HttpModule } from '@angular/http';

import { FilterPipe } from '../pipes/filter/filter';
import { LaunchFilterPipe } from '../pipes/launch-filter/launch-filter';
import { SuccessFilterPipe } from '../pipes/success-filter/success-filter';
import { FailFilterPipe } from '../pipes/fail-filter/fail-filter';
import { DateRangeFilterPipe } from '../pipes/date-range-filter/date-range-filter';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from "@angular/common/http";
import { CalendarModule } from "ion2-calendar";
import { SpacexApiProvider } from "../providers/spacex-api/spacex-api";
import { RedditApiService } from "../providers/reddit/reddit-api-service";

import { LocalNotifications } from '@ionic-native/local-notifications';
import { ChartsModule } from 'ng2-charts';
import { RocketPage } from '../pages/rocket/rocket';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LaunchPage,
    RedditPage,
    CompanyPage,
    StatsPage,
    CountDown,
    FilterPipe,
    LaunchFilterPipe,
    SuccessFilterPipe,
    FailFilterPipe,
    DateRangeFilterPipe,
    RocketPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CalendarModule,
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LaunchPage,
    RedditPage,
    CompanyPage,
    StatsPage,
    RocketPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SpacexApiProvider,
    RedditApiService,
    LocalNotifications
  ]
})
export class AppModule {}
