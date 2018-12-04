import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BasePage} from "../../../app/base";
import {AppConfig} from "../../../app/app.config";
import {HttpService} from "../../../providers/http.service";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the HospitalFlash page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hospital-flash',
  templateUrl: 'hospital-flash.html'
})
export class HospitalFlashPage extends BasePage {

  private newsList: any[]= [];

  private imgUrlPrefix: string;

  private option = {
    index: 0,
    catalog: '',
    type: 'ANNOUNCEMENT',
    pageNum: 1,
    pageSize: 10,
    hasMore: false
  };

  constructor(public httpService: HttpService, public app: AppConfig, public navCtrl: NavController,
              public navParams: NavParams, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.imgUrlPrefix = this.app.url.cms + '/image/' + this.app.hospitalId + '/news/';
  }

  ionViewDidLoad() {
    this.doRefresh();
  }

  doRefresh(infiniteScroll?: any) {
    this.option.pageNum = 1;
    this.httpService.loadHealthNewsByType(this.option)
      .subscribe(json => {
        if (json.success) {
          var dataItems = json.resultData ? json.resultData.pageData : [];
          this.newsList = dataItems;
          this.option.pageNum++;
          this.option.hasMore = dataItems && dataItems.length == this.option.pageSize;
          if (infiniteScroll) {
            infiniteScroll.complete();
          }
        }
    })
  }

  loadMoreData(infiniteScroll?: any) {
    this.httpService.loadCatalogList(this.option)
      .subscribe(json => {
        if (json.success) {
          var dataItems = json.resultData ? json.resultData.pageData : [];
          this.option.pageNum++;
          this.option.hasMore = dataItems && dataItems.length == this.option.pageSize;
          this.newsList = this.newsList.concat(dataItems);
          if (infiniteScroll) {
            infiniteScroll.complete();
          }
        }
      });
  }
}
