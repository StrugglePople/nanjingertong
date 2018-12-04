import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpService} from "../../../../providers/http.service";
import {AccountService} from "../../../../providers/account.service";
import {CacheService} from "../../../../providers/cache.service";
import {AppConfig} from "../../../../app/app.config";
import {WidgetService} from "../../../../providers/widget.service";
import * as JsBarcode from "jsbarcode";
declare let HOSPITAL_ID:any;
declare let PLATFORM:any;
declare let rootPath:any;
/**
 * Generated class for the SelfPayDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-self-pay-detail',
  templateUrl: 'self-pay-detail.html',
})
export class SelfPayDetailPage {

  data;
  yaopinStatus:any[] = [];
  constructor(public app: AppConfig,public navCtrl: NavController, public navParams: NavParams, public httpService: HttpService,
              public accountService: AccountService, public cacheService: CacheService,private widgetService: WidgetService) {
    this.data = this.navParams.data.data || {};
  }

  ionViewWillEnter() {


  }
  ionViewDidEnter() {
    let canvas = document.getElementById('canvas');
    JsBarcode(canvas, this.data.medicalCardNO);
  }
  pay() {
    this.widgetService.confirm('本平台仅支持全额自费支付，是否需要继续？',()=>{
      this.httpService.payForBill(this.data.zhpBusinessNO)
        .subscribe(json => {
          if (json.success) {
            let data = {
              source: 'selfPay',
              trade_no: json.data.tradeNo,
              outTradeNo: json.data.outTradeNo,
              businessId: json.data.businessId,
              partnerId: json.data.partnerId,
              partner_sign: json.data.partnerSign,
            };
            this.httpService.summary(data['partner_sign'], data.trade_no, '')
              .subscribe(json => {
                data['fee'] = json.trade_fee;
                this.cacheService.set("cache.selectPayViewData", data);
                this.navCtrl.push('PaySelectWayPage');
              })
          }
        })

    });


  }

}
