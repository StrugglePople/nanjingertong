import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as JsBarcode from "jsbarcode";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {BasePage} from "../../../app/base";
import {HttpService} from "../../../providers/http.service";

/**
 * Generated class for the FeeRecordDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chufang-record-detail',
  templateUrl: 'chufang-record-detail.html',
})
export class ChufangRecordDetail extends BasePage{
  id;
  data ={feeBase:{}};
  constructor(public navCtrl: NavController, public navParams: NavParams,public httpService:HttpService, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);

    this.id = this.navParams.data;
  }

  ionViewWillEnter() {
    this.httpService.getChufangRecordDetail(this.id)
      .subscribe(json => {
        if (json.success) {
          this.data = json.data;
        } else {

        }

      })
  }

}
