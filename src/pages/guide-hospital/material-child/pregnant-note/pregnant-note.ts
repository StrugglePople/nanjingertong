import { Component } from '@angular/core';
import {IonicPage, NavController, NavControllerBase, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../providers/http.service";
import {CacheService} from "../../../../providers/cache.service";
import {BasePage} from "../../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the PregnantNotePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pregnant-note',
  templateUrl: 'pregnant-note.html',
})
export class PregnantNotePage extends BasePage{

  preDate;

  data = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpService,
              public cacheService: CacheService, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.preDate = this.cacheService.get('cache.preDate');
    this.loadData();
  }

  loadData() {
    this.httpService.ajaxPregnantNotice(this.preDate.pregnantMonth)
      .subscribe(json => {
          if (json.success) {
            this.data = json.data[0] || {};
          }
      });
  }

  backButtonClick() {
    let nav: NavControllerBase = this.navCtrl.parent.parent;
    nav.pop();
  }
}
