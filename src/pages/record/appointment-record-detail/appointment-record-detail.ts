import { Component } from '@angular/core';
import {DateTime, Events, IonicPage, NavController, NavParams} from 'ionic-angular';
// import * as JsBarcode from "jsbarcode";
import {AppConfig} from "../../../app/app.config";
import {WidgetService} from "../../../providers/widget.service";
import {HttpService} from "../../../providers/http.service";
import {CacheService} from "../../../providers/cache.service";
import {BasePage} from "../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {DateService} from "../../../providers/date.service";


/**
 * Generated class for the AppointmentRecordDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-appointment-record-detail',
  templateUrl: 'appointment-record-detail.html',
})
export class AppointmentRecordDetailPage extends BasePage{
  data;
  showTime;
  atartTime;
  clinicStr;
  constructor(public app: AppConfig, public navCtrl: NavController, public navParams: NavParams, public nativePageTransitions: NativePageTransitions,
              public widgetService: WidgetService, public httpService: HttpService, public event: Events,
              public cacheService?: CacheService, public dateService?: DateService) {
    super(navCtrl, navParams, nativePageTransitions);
    let data = this.navParams.data;  //arrays = data.visitNo.split('_')
    this.clinicStr = data.createTime.slice(0,10) == data.regDate.slice(0,10) ? '挂号' : '预约';
    this.data = data;
    this.cacheService.set('appointmentRecordDetail', this.data);
  }

  showMap() {
    this.navCtrl.pop();
  }

  //取消预约
  cancelYuyue() {
    this.widgetService.confirm('是否取消预约？', ()=> {
      this.httpService.cancelYuyue(this.data['hospitalId'],this.data['id'])
        .subscribe(json => {
          if(json.success) {
            this.data['status'] = 'CANCELLED';
            this.data['canCancel'] = 0;
            this.data['recordStatus'] = '已撤销';
            this.widgetService.alert(json.errMsg, ()=> {

            })
          }
        })
    })
  }

  //确认预约
  confirm() {
    this.httpService.confirmReg(this.data.id)
      .subscribe(json => {
        if (json.success) {
          let dept = {name: this.data.dept},
            schedule = {regDate: this.data.regDate, regTime: this.data.regTime},
            time,
            expert;
          if (this.data.isExpert == 1) {
            expert = {name: this.data.expertName, title: this.data.title};
          }
          if (this.data.visitTime) {
            time = {timeline: this.data.visitTime};
          }
          let data = {
            trade_no: json.data.tradeNo,
            partner_sign: json.data.partnerSign,
            expert: expert,
            dept: dept,
            schedule: schedule,
            time: time,
            businessId: json.data.businessId,
            source: 'confirmPay',
            type : this.clinicStr,
            appointId:this.data.id
          };
          this.httpService.summary(json.data.partnerSign, json.data.tradeNo, '')
            .subscribe(json => {
              data['fee'] = json.trade_fee;
              this.cacheService.set("cache.selectPayViewData", data);
              this.navCtrl.push('PaySelectWayPage');
            })
        }
      })
    /*this.widgetService.confirm('挂号费用将从就诊卡里直接扣除', ()=> {
      this.httpService.confirmReg(this.data['id'])
        .subscribe(json => {
          if (json.success) {
            this.data['status'] = 'PASS';
            this.data['canConfirm'] = 0;
            this.widgetService.alert(json.errMsg, ()=> {

            })
          }
        })
    });*/
  }

  //删除记录
  deleteRecord() {
    this.widgetService.confirm('是否删除记录？', ()=> {
      this.httpService.deleteRecord(this.data['zhpTradeId'])
        .subscribe(json => {
          if(json.success) {
            this.widgetService.alert(json.errMsg, ()=> {
              this.event.publish('appoint.delete', this.data);
              this.navCtrl.pop();
            })
          }
        })
    })
  }
}
