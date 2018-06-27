import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CountDown } from "ng4-date-countdown-timer";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LaunchPage } from '../pages/launch/launch';

import { FilterPipe } from '../pipes/filter/filter';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from "@angular/common/http";
import { SpacexApiProvider } from "../providers/spacex-api/spacex-api";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LaunchPage,
    CountDown,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LaunchPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SpacexApiProvider
  ]
})
export class AppModule {}
