import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CacheService} from "../../../../providers/cache.service";
import {BasePage} from "../../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the DeptInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-outpatient-pay-detail',
  templateUrl: 'outpatient-pay-detail.html',
})
export class OutpatientPayDetail extends BasePage{


  nopay:boolean;
  constructor(public cacheService: CacheService, public navCtrl: NavController, public navParams: NavParams,
              public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.nopay = navParams.data.nopay

  }

  ionViewWillEnter() {

  }



}
