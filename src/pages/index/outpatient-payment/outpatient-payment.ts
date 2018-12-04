import {Component, Inject, ViewChild} from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams, TextInput} from 'ionic-angular';
import {BasePage} from "../../../app/base";
import {HttpService} from "../../../providers/http.service";
import {WidgetService} from "../../../providers/widget.service";
import {ValidateService} from "../../../providers/validate.service";
import {CacheService} from "../../../providers/cache.service";
import {AppConfig} from "../../../app/app.config";
import {AccountService} from "../../../providers/account.service";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-outpatient-payment',
  templateUrl: 'outpatient-payment.html'
})
export class OutpatientPayment extends BasePage {



  constructor(public httpService: HttpService, public widgetService: WidgetService,public cacheService: CacheService,
              public navCtrl: NavController, public app: AppConfig, public accountService: AccountService,
              public navParams: NavParams) {
    super(navCtrl, navParams);
  }

  ionViewWillEnter() {

  }
  segmentChanged(){

  }

}
