import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {AccountService} from "../../../providers/account.service";
import {HttpService} from "../../../providers/http.service";
import {getBasePath} from "@ionic/app-scripts/dist/util/glob-util";
import {BasePage} from "../../../app/base";
import {WidgetService} from "../../../providers/widget.service";
import {CacheService} from "../../../providers/cache.service";
import {AppConfig} from "../../../app/app.config";
declare let memberModal:any
/**
 * Generated class for the SelfPayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-self-pay',
  templateUrl: 'self-pay.html',
})
export class SelfPayPage extends BasePage {

  member? = {};

  items = [];

  allChecked;

  money = '0.00';
  checked:any;
  hasMore = false;
  yearMonth:any;
  constructor(public accountService: AccountService, public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl: ModalController, public httpService: HttpService, public widgetService: WidgetService,
              public cacheService: CacheService,public app: AppConfig) {
    super(navCtrl, navParams);

    this.checked = 'billing';
  }

  ionViewWillEnter() {
    if(!this.items || this.items.length == 0){
      this.member = this.accountService.getSelectMember() || {};
      if (this.member && this.member['id']) {
        if(this.checked == 'billed'){
          this.loadData0(true,false);
        }else if(this.checked == 'billing'){
          this.loadData(true,false);
        }
      }
    }

  }

  loadData(hasLoading,Norefresh, infiniteScroll?: any) {
    if(this.checked == 'billing'&& Norefresh){
      return;
    }
    this.items = [];
    this.yearMonth = '';
    if(!this.member){
      this.widgetService.toast('请先选择持卡人');
      return;
    }
    this.checked = 'billing';
    this.items = [];
    this.httpService.getBillingList(this.member['aesId'])
      .subscribe(json => {
        if (json.success) {
          let items = json.data || [];
          for (let i = 0; i < items.length; i++) {
            items[i].checked = false;
          }
          this.items = items;
        }
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      })
  }
  loadData0(hasLoading,Norefresh, infiniteScroll?: any) {
    if(this.checked == 'billed' && Norefresh){
      return;
    }
    this.items = [];
    this.yearMonth = '';
    if(!this.member){
      this.widgetService.toast('请先选择持卡人');
      return;
    }
    this.checked = 'billed';
    this.items = [];
    this.httpService.getBilledList(this.member['aesId'],this.yearMonth)
      .subscribe(json => {
        if (json.success) {
          if (json.data && json.data.billList) {
            this.items.push(json.data);
            this.yearMonth = json.data.monthName;
            this.hasMore = true;
          }
        }
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      })
  }
  DownRefresh(hasLoading,infiniteScroll){
    this.yearMonth = '';
    if(this.checked == 'billing'){
      this.loadData(hasLoading,false, infiniteScroll);
    }else{
      this.loadData0(hasLoading,false,infiniteScroll);
    }

  }
  loadMoreData() {
    this.hasMore = false;
    if (!this.member) return;
    this.httpService.getBilledList(this.member['aesId'], this.yearMonth)
      .subscribe(json => {
        if (json.success) {
          if (json.data && json.data.billList) {
            this.items.push(json.data);
            this.yearMonth = json.data.monthName;
            this.hasMore = true;
          }
        }
      })
  }


  pushMemberSelectView(){
    this.items = [];
    this.yearMonth = '';
    this.navCtrl.push('MemberSelectModalPage');
  }
}
