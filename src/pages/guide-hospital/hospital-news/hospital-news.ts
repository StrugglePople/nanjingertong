import {Component, ElementRef, ViewChild, Renderer2} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AppConfig} from "../../../app/app.config";
import {BasePage} from "../../../app/base";
import {HttpService} from "../../../providers/http.service";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the HealthInformation page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hospital-news',
  templateUrl: 'hospital-news.html'
})
export class HospitalNews extends BasePage {

  private items: any[]= [];

  private newsList: any[]= [];

  private imgUrlPrefix: string;

  private option = {
    index: 0,
    catalogId: '',
    pageNumber: 1,
    pageSize: 7,
    hasMore: false
 };

  type;

  title;

  @ViewChild('grid') grid: ElementRef;

  constructor(public app: AppConfig, public httpService: HttpService, public render: Renderer2,
              public navCtrl: NavController, public navParams: NavParams, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.imgUrlPrefix = this.app.url.cms + '/image/' + this.app.hospitalId + '/news/';
    this.type = this.navParams.data.type;
    this.title = this.navParams.data.title;
  }

  ionViewDidLoad() {
    this.loadKinds();
  }

  //获取this.type种类
  loadKinds() {
    this.httpService.loadHospitalNews()
      .subscribe(json => {
        if (json.success) {
          this.items = json.data.catalogList;
          this.render.setStyle(this.grid.nativeElement, 'width', this.items.length * 74 / 10 + 'rem');
          this.option.catalogId = this.items[0].id;
          this.doRefresh();
        }
      })
  }

  //选择某种this.type种类
  selectTab(index) {
    if (this.option.index == index) return;
    this.option = {
      index: index,
      catalogId: this.items[index].id,
      pageNumber: 1,
      pageSize: 7,
      hasMore: false,
    };
    this.doRefresh();
  }

  doRefresh(infiniteScroll?: any) {
    this.option.pageNumber = 1;
    this.httpService.loadHospitalNewsList(this.option)
      .subscribe(json => {
        if (json.success) {
          var dataItems = json.data.pageData ? json.data.pageData : [];
          this.newsList = dataItems;
          this.option.pageNumber++;
          this.option.hasMore = dataItems && dataItems.length == this.option.pageSize;
        }
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      });
  }

  loadMoreData(infiniteScroll?: any) {
      this.httpService.loadHospitalNewsList(this.option)
      .subscribe(json => {
        if (json.success) {
          var dataItems = json.data.pageData ? json.data.pageData : [];
          this.option.pageNumber++;
          this.option.hasMore = dataItems && dataItems.length == this.option.pageSize;
          this.newsList = this.newsList.concat(dataItems);
        }
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      });
  }

}
