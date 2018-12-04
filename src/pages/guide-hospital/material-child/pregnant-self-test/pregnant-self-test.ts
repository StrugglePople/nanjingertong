import { Component } from '@angular/core';
import {IonicPage, NavController, NavControllerBase, NavParams} from 'ionic-angular';
import {CacheService} from "../../../../providers/cache.service";
import {HttpService} from "../../../../providers/http.service";
import {BasePage} from "../../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the PregnantSelfTestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pregnant-self-test',
  templateUrl: 'pregnant-self-test.html',
})
export class PregnantSelfTestPage extends BasePage{
  preDate;
  src;
  situation = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public cacheService: CacheService,
              public httpService: HttpService, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.preDate = this.cacheService.get('cache.preDate');
    this.src = 'assets/image/guide-hospital/pregnant/' + this.preDate.pregnantWeek + '.jpg';
    this.loadSituation();
  }

  loadSituation() {
    this.httpService.ajaxPregnantSituation(this.preDate.pregnantWeek)
      .subscribe(json => {
        if (json.success) {
          this.situation = json.data[0] || {};
        }
      });
  }

  backButtonClick() {
    let nav: NavControllerBase = this.navCtrl.parent.parent;
    nav.pop();
  }
}
