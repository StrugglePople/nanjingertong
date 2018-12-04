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
  selector: 'page-health-information',
  templateUrl: 'health-information.html'
})
export class HealthInformationPage extends BasePage {

  private items: any[]= [];

  private newsList: any[]= [];

  private imgUrlPrefix: string;

  private option = {
    index: 0,
    catalog: '',
    pageNum: 1,
    pageSize: 10,
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
    this.httpService.loadCatalogKindByType(this.type)
      .subscribe(json => {
        if (json.success) {
          this.option.catalog = json.resultData.id;
          this.doRefresh();
          /*this.httpService.loadHealthNewsCatalogsByParentId(json.resultData.id)
            .subscribe(data1 => {
              if (data1.success) {
                this.items = data1.resultData.voList;
                this.render.setStyle(this.grid.nativeElement, 'width', this.items.length * 74 / 10 + 'rem');
                this.option.catalog = this.items[0].id;
                this.doRefresh();
              }
            })*/
        }
      });
  }

  //选择某种this.type种类
  selectTab(index) {
    if (this.option.index == index) return;
    this.option = {
      index: index,
      catalog: this.items[index].id,
      pageNum: 1,
      pageSize: 20,
      hasMore: false,
    };
    this.doRefresh();
  }

  doRefresh(infiniteScroll?: any) {
    this.option.pageNum = 1;
    this.httpService.loadCatalogList(this.option)
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
      });
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
