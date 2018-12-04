import { Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';

import { AppConfig } from '../../app/app.config'
import { DateService } from '../../providers/date.service';
import { BasePage } from "../../app/base";
import {HttpService} from "../../providers/http.service";
import {CacheService} from "../../providers/cache.service";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {WidgetService} from "../../providers/widget.service";

/**
 * Generated class for the Index page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html'
})
export class IndexPage extends BasePage {

  private banners?: any[];
  private newsList?: any[];
  private hospitalName: string;
  rolling:any = {};
  threeModule:any[] = [];
  constructor(public httpService: HttpService, public cacheService: CacheService, public navCtrl: NavController,
              public navParams: NavParams, public app: AppConfig, public nativePageTransitions: NativePageTransitions,
              public widgetService: WidgetService) {
    super(navCtrl, navParams, nativePageTransitions, app);
    this.loadBanners(false);
    this.hospitalName = this.app.hospitalName;
    this.loadHealthNews();
    this.showRolling();
    for(let i=1;i<=8;i++){
      this.threeModule.push("assets/image/index/three-"+ i +".png")
    }
  }

  //加载banners
  private loadBanners (hasLoading: boolean) {
    let dateService = new DateService();
    let banners = [
      {
        imageUrl: 'assets/image/index/banner-1.png',
        note:''
      },
      {
        imageUrl: 'assets/image/index/banner-2.png',
        note:''
      }
    ];
    this.httpService.loadBanners(false)
      .subscribe(json  => {
        if (json.success) {
          if (json.resultData.length > 0) {
            let cacheData = {
              data: json,
              time: dateService.format(new Date())
            };
            this.cacheService.set('cache.banner', cacheData);
            this.banners = json.resultData;
          } else {
            this.banners = banners;
          }
        } else {
          this.banners = banners;
        }
    })
  }

  //加载新闻
  private loadHealthNews() {
    this.httpService.loadCatalogKindByType('HEALTH',true)
      .subscribe(json => {
        if (json.success) {
          this.httpService.loadCatalogList({catalog:json.resultData.id,pageNum:1,pageSize: 3},true)
            .subscribe(json => {
              if (json.success) {
                let dataItems = json.resultData ? json.resultData.pageData : [];
                this.newsList = dataItems;

              }
            });

        }
      });
    /*this.httpService.loadHealthNewsByType({type: 'HEALTH', pageNum: 1, pageSize: 5})
      .subscribe(json => {
          if (json.success) {
            this.newsList = json.resultData.pageData;
            this.imgUrlPrefix = this.app.url.cms + '/image/' + this.app.hospitalId + '/news/';
          }
      });*/
  }
  private showRolling(){
    this.httpService.loadRollingLast()
      .subscribe(json => {
        if (json.success) {
          if(json.resultData.validFlag != 'ENABLE'){
            return;
          }
          this.rolling = json.resultData;
        }
      });
    /*this.httpService.loadCatalogKindByType('ROLLING',true)
      .subscribe(json => {
        if (json.success) {
          this.httpService.loadCatalogList({catalog:json.resultData.id,pageNum:1,pageSize: 1},true)
            .subscribe(json => {
              if (json.success) {
                this.rolling = json.resultData ? json.resultData.pageData[0]:{};
              }
            });

        }
      });*/
  }
  showClinicNoteView(type) {
    this.navCtrl.push('HtmlInfoPage', {type: type})
  }
  showStopCar(){
    this.widgetService.confirm('暂且只支持河西院区查询',()=>{
      this.pushView('StopCar',{'needLogin': true});
    });

  }


}
