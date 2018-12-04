import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpService} from "../../../providers/http.service";
import {CacheService} from "../../../providers/cache.service";
import {BasePage} from "../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the Faq page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage extends BasePage {

  items: any[] = [];

  constructor(public httpService: HttpService, public cacheService: CacheService, public navCtrl: NavController,
              public navParams: NavParams, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
  }

  ionViewDidLoad() {
    this.httpService.getFaqs()
      .subscribe(json => {
        if (json.success) {
          this.cacheService.set('faqs', {
            data: json,
            time: new Date().getTime()
          });
          this.items = json.data;
        }
      })
  }

}
