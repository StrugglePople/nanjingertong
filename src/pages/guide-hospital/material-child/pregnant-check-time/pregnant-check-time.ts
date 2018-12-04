import { Component } from '@angular/core';
import {IonicPage, NavController, NavControllerBase, NavParams} from 'ionic-angular';
import {CacheService} from "../../../../providers/cache.service";
import {HttpService} from "../../../../providers/http.service";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {BasePage} from "../../../../app/base";

/**
 * Generated class for the PregnantCheckTimePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pregnant-check-time',
  templateUrl: 'pregnant-check-time.html',
})
export class PregnantCheckTimePage extends BasePage{

  member;

  data;

  constructor(public navCtrl: NavController, public navParams: NavParams, cacheService: CacheService,
              public httpService: HttpService, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.member = cacheService.get('cache.FEMALE');
    this.loadData();
  }

  loadData() {
    this.httpService.ajaxPregnantCheckSchedule(this.member.id)
      .subscribe(json => {
        if (json.success) {
          this.data = json.data;
        }
      });
  }

  backButtonClick() {
    let nav: NavControllerBase = this.navCtrl.parent.parent;
    nav.pop();
  }
}
