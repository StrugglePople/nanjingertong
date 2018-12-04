import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpService} from "../../../providers/http.service";
import {BasePage} from "../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the HealthInformationDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hospital-news-detail',
  templateUrl: 'hospital-news-detail.html'
})
export class HospitalNewsDetail extends BasePage{

  private detail: any = {};

  constructor(public httpService: HttpService, public navCtrl: NavController, public navParams: NavParams,
              public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.detail = this.navParams.data;
  }


}
