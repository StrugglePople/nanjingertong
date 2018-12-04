import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {BasePage} from "../../../app/base";
import {AccountService} from "../../../providers/account.service";
import {WidgetService} from "../../../providers/widget.service";
import {HttpService} from "../../../providers/http.service";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the AppointmentRecord page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-price-info-sub',
  templateUrl: 'price-info-sub.html',
})
export class PriceInfoSub extends BasePage {

  priceItem;
  constructor(public accountService: AccountService,public widgetService: WidgetService,
              public httpService:HttpService, public navCtrl: NavController,
              public navParams: NavParams, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.priceItem = this.navParams.data;
  }

  ionViewWillEnter(){

  }


}
