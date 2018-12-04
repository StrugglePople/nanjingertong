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
  selector: 'page-outpatient-pay',
  templateUrl: 'outpatient-pay.html',
})
export class OutpatientPay extends BasePage{

  type:boolean;
  constructor(public cacheService: CacheService, public navCtrl: NavController, public navParams: NavParams,
              public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.type = navParams.data.type

  }

  ionViewWillEnter() {
    // this.cacheService.setClinicParam('type', 'introduce');
  }


}
