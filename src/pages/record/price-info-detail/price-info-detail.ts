import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {WidgetService} from "../../../providers/widget.service";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {BasePage} from "../../../app/base";

/**
 * Generated class for the AppointmentRecord page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-price-info-detail',
  templateUrl: 'price-info-detail.html',
})
export class PriceInfoDetail extends BasePage {

  priceDetail;
  constructor(public widgetService: WidgetService, public navCtrl: NavController, public navParams: NavParams,
              public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.priceDetail = this.navParams.data;
  }

  ionViewWillEnter(){

  }


}
