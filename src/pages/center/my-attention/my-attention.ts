import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpService} from "../../../providers/http.service";
import {CacheService} from "../../../providers/cache.service";
import {AppConfig} from "../../../app/app.config";
import {BasePage} from "../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the MyAttentionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-attention',
  templateUrl: 'my-attention.html',
})
export class MyAttentionPage extends BasePage{

  items = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpService,
              public cacheService: CacheService, public app: AppConfig, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(infiniteScroll?: any) {
    this.httpService.getAttentions()
      .subscribe(json => {
        if (json.success) {
          for (let expert of json.data) {
            if (expert.expertResource.picName.indexOf('http') > -1) {
              expert.expertResource.src = expert.expertResource.picName + '?' + new Date().getTime();
            } else {
              expert.expertResource.src = this.app.url.mobile + '/mobile/image/hospital/' + this.app.hospitalId + '/expert/' + expert.expertResource.picName;
            }
          }
          this.items = json.data;
        }
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      })
  }

  cancelAttention(e,item) {
    let index = this.items.indexOf(item);
    this.httpService.cancelAttention(item.id)
      .subscribe(json => {
        if (json.success) {
          this.items.splice(index, 1);
        }
      });
    e.stopPropagation();
  };

  showExpertInfo = function(item) {
    let expert = item.expertResource;
    this.cacheService.clearClinicParam();
    this.cacheService.setClinicParam('type', 'clinic');
    this.cacheService.setClinicParam('expert', expert);
    this.navCtrl.push('ExpertInfoPage');
  };
}
