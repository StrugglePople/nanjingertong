import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AppointmentRecordDetailPage} from "../appointment-record-detail/appointment-record-detail";
import {AppConfig} from "../../../app/app.config";
import {WidgetService} from "../../../providers/widget.service";
import {HttpService} from "../../../providers/http.service";
import {CacheService} from "../../../providers/cache.service";
import {DateService} from "../../../providers/date.service";
import {AccountService} from "../../../providers/account.service";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
declare let HOSPITAL_ID:any;
/**
 * Generated class for the RegRecordDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-recharge-record-detail',
  templateUrl: 'recharge-record-detail.html',
})
export class RechargeRecordDetailPage {
  rechargeStatus:any;
  card:any;
  data:any;
  constructor(public app: AppConfig,public accountService: AccountService, public navCtrl: NavController, public navParams: NavParams,
              public widgetService: WidgetService) {
    this.data = this.navParams.data.data;
    this.card = this.accountService.getSelectCard() || {};
    // this.cacheService.set('regRecordDetail', this.data);
    this.rechargeStatus = {
      'INIT': '等待付款',
      'FAIL': '交易失败',
      'CLOSED': '交易关闭',
      'SUCCESS': '交易成功'
    };
  }
  ionViewWillEnter() {
    // this.data = this.cacheService.get('regRecordDetail');
  }







}
