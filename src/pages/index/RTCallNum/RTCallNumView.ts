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
  selector: 'page-RTCallNumView',
  templateUrl: 'RTCallNumView.html',
})
export class RTCallNumView extends BasePage{

  callDetail:any[] = [];
  regTimeMap = {
    'MORNING': '上午',
    'AFTERNOON': '下午',
    'EVENING': '夜间',
    'E_MORNING': '凌晨'
  };
  constructor(public app: AppConfig, public navCtrl: NavController, public navParams: NavParams, public nativePageTransitions: NativePageTransitions,
              public widgetService: WidgetService, public httpService: HttpService, public event: Events,
              public cacheService?: CacheService, public dateService?: DateService) {
    super(navCtrl, navParams, nativePageTransitions);

  }
  getCallnum() {
    this.httpService.getCallnum()
      .subscribe(json => {
        if (json.success) {
          this.callDetail = json.data;
        }
      })

  }
  showDeptList() {
    this.httpService.getAppointDeptList("0")
      .subscribe(json => {
        if (json.success) {
          if(json.data.length == 0){
            this.widgetService.toast('暂无叫号信息');
            return;
          }
          this.cacheService.set('deptList', json.data);
          this.navCtrl.push('DeptListPage',{type:'callNum'});
        }
      })
  }

}
