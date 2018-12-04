import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpService} from "../../../providers/http.service";
import {BasePage} from "../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {CacheService} from "../../../providers/cache.service";
import {WidgetService} from "../../../providers/widget.service";
import {AppConfig} from "../../../app/app.config";
import {CallNumber} from "@ionic-native/call-number";

declare let ZkPlugin: any;
/**
 * Generated class for the HtmlInfo page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 * 这个页面所有文案类型都能用，只要传入的type能用
 */
@IonicPage()
@Component({
  selector: 'page-check-inspect-record',
  templateUrl: 'check-inspect-record.html',
  providers: [CallNumber]
})
export class CheckInspectRecord extends BasePage{

  title: string;

  type: string;

  content: string;
  checked:boolean = false;
  //title需要在这里加，如果不需要就不用加
  types: any = {
    'ABOUT_US': '关于我们',
    'YUYUE': '预约须知',
    'CHECK-INSPECT': '报告单查询',
    'YUYUE-RECORD': '预约挂号记录',
    'YUANNEI-DAOHANG': '院内导航',
    'YUANWAI-DAOHANG': '来院导航',
    'PHONE_NUMBER': '联系医院'
  };
  phone:any;

  constructor(private callNumber: CallNumber, public navCtrl: NavController, public navParams: NavParams, public app: AppConfig,
              public nativePageTransitions: NativePageTransitions, public cacheService: CacheService,public widgetService: WidgetService) {
    super(navCtrl, navParams, nativePageTransitions);
    this.type = this.navParams.data.type;
    this.title = this.types[this.type];
    this.phone = this.navParams.data.phone;
  }
  openMap(type) {
    if (this.app.isInApp) {
      ZkPlugin.openMap(this.app.baiduMapData[type]);
    }
  }
  getTel(tel) {
    let phone = tel.split('：')[1];
    /*this.widgetService.confirm(phone, () => {
      this.callNumber.callNumber(phone, true);
    }, '联系客服', '拨号');*/
    this.callNumber.callNumber(phone, true);
  }

}
