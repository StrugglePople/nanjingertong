import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Select} from 'ionic-angular';
import {CacheService} from "../../../../providers/cache.service";
import {HttpService} from "../../../../providers/http.service";
import {AccountService} from "../../../../providers/account.service";
import {WidgetService} from "../../../../providers/widget.service";
import {BasePage} from "../../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {AppConfig} from "../../../../app/app.config";

/**
 * Generated class for the ExpertInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-visit-detail',
  templateUrl: 'visit-detail.html',
})
export class VisitDetail extends BasePage{



  constructor(public app: AppConfig,public cacheService: CacheService,public navCtrl: NavController, public navParams: NavParams,
              public httpService: HttpService,  public accountService: AccountService, public widgetService: WidgetService,
              public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);

  }

  ionViewWillEnter() {

  }

}
