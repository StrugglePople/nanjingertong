import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
//组件
import { ModuleSeparateComponentModule } from '../components/module-separate/module-separate.module'

//服务
import { AppConfig } from './app.config'
import { HttpService } from '../providers/http.service';
import { DateService } from  '../providers/date.service';
import { Logger } from '../providers/logger';
import { WidgetService } from '../providers/widget.service';
import { ValidateService } from '../providers/validate.service';
import { APP_CONSTANT } from '../providers/data.service';
import {CacheService} from "../providers/cache.service";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {BackButtonService} from "../providers/backButton.service";
import {Device} from "@ionic-native/device";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: 'true',
      backButtonText: '',
      iconMode: 'ios',
      mode: 'ios'
    }),
    ModuleSeparateComponentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    AppConfig,
    HttpService,
    DateService,
    Logger,
    WidgetService,
    ValidateService,
    CacheService,
    Device,
    NativePageTransitions,
    InAppBrowser,
    { provide: 'DataService', useValue: APP_CONSTANT },
    BackButtonService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {

}
