import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CacheService} from "../../../../providers/cache.service";
import {AppConfig} from "../../../../app/app.config";
import {HttpService} from "../../../../providers/http.service";
import {WidgetService} from "../../../../providers/widget.service";
import {BasePage} from "../../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

declare let ZkPlugin: any;
/**
 * Generated class for the PaySelectWayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pay-select-way',
  templateUrl: 'pay-select-way.html',
})
export class PaySelectWayPage extends BasePage{

  selectValue = 'aliPay'; // 1支付宝， 2微信， 3银联

  option;

  hospitalName;

  alipaySrc = 'assets/image/pay/alipay.png';

  wxSrc = 'assets/image/pay/wechat.png';

  unionPaySrc = 'assets/image/pay/unionPay.png';
  cbcpaySrc = 'assets/image/pay/CBC-pay.png';

  constructor(public navCtrl: NavController, public navParams: NavParams, public cacheService: CacheService,
              public app: AppConfig, public httpService: HttpService, public widgetService: WidgetService,
              public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.option = this.cacheService.get("cache.selectPayViewData") || {};
    if(this.option.source == 'stopCarPay'){
      this.selectValue = 'wxPay';
    }
  }

  pay() {
    this[this.selectValue]();
  }

  aliPay() {
    // this.navCtrl.push('PayResultPage', {success: true});
    // return;
    this.httpService.tradeText('1007', this.option.trade_no, this.option.partner_sign)
      .subscribe(json => {
        if (this.app.isInApp) {
          ZkPlugin.alipay(json._body, (message)=> {
            this.handleResult(message)
          }, (message)=> {
            this.handleResult(message);
          })
        }
      })
  }
  wxPay() {
    this.httpService.trade('3003', this.option.trade_no, this.option.partner_sign)
      .subscribe(json => {
        let paymentData = {
          'payAppId': json.appid,
          'payNonceStr': json.noncestr,
          'payPackage': json['package'],
          'payPartnerid': json.partnerid,
          'payPrepayid': json.prepayid,
          'paySign': json.sign,
          'payTimestamp': json.timestamp,
          'zhicallSerial': this.option.trade_no
        };
        //调用原生插件
        if (this.app.isInApp) {
          ZkPlugin.wxpay(paymentData, (message)=> {
            this.handleResult(message)
          }, (message)=> {
            this.handleResult(message);
          })
        }

      })
  }
  unionPay() {
    this.httpService.trade('2001', this.option.trade_no, this.option.partner_sign)
      .subscribe(json => {
        //调用原生插件
        let tn = json.data.tn;
        ZkPlugin.unionpay(tn, (message)=> {
          this.handleResult(message)
        }, (message)=> {
          this.handleResult(message);
        })
      })
  }

  handleResult(message) {
    if (message == '9000') {
      this.navCtrl.push('PayResultPage', {success: true})
    } else if (message == '6001') {
      this.widgetService.alert('支付中断')
    } else {
      this.navCtrl.push('PayResultPage', {success: false})
    }
  }
}
