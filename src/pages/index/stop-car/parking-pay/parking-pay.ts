import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {CacheService} from "../../../../providers/cache.service";
import {HttpService} from "../../../../providers/http.service";
import {BasePage} from "../../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {WidgetService} from "../../../../providers/widget.service";
declare let ZkPlugin: any;
/**
 * Generated class for the PayResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-parking-pay',
  templateUrl: 'parking-pay.html',
})
export class ParkingPay extends BasePage{

  plateno:any;
  paylist:any[] = [];

  constructor(public cacheService: CacheService, public navCtrl: NavController, public navParams: NavParams, public widgetService: WidgetService,
              public httpService: HttpService, public platform: Platform, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.plateno = this.navParams.data;
    this.showParkingPay();
  }


  showParkingPay(){
    this.httpService.showParkingPay(this.plateno).subscribe(json=>{
      if(json.success){
        this.paylist = json.data;
      }
    })
  }
  payStopCar(data) {
    this.widgetService.confirm('亲爱的用户，请您在完成付款后10分钟内将您的爱车驶离开停车场。若超时未离开，将重新计算停车费用，谢谢配合！', () => {
      data.from = 4;
      data.payType = 5;
      this.httpService.parkingFund(data)
        .subscribe(json => {
          if (json.success) {
            let data = {
              trade_no: json.data.tradeNo,
              partner_sign: json.data.partnerSign,
              businessId: json.data.businessId,
              appointId: this.plateno,
              source: 'stopCarPay',
            };
            this.httpService.summary(json.data.partnerSign, json.data.tradeNo, '')
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
