import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import {CacheService} from "../../../../providers/cache.service";
import {BasePage} from "../../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {BaseClinicPage} from "../baseClinic";
import {DateService} from "../../../../providers/date.service";
import {AccountService} from "../../../../providers/account.service";
import {AppConfig} from "../../../../app/app.config";
import {HttpService} from "../../../../providers/http.service";
import {WidgetService} from "../../../../providers/widget.service";

/**
 * Generated class for the DeptInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-source-detail',
  templateUrl: 'source-detail.html',
})
export class SourceDetail extends BaseClinicPage{


  expertInfo:any = {};
  dept:any;
  commonInfo:any;
  guahaoType:any;
  regScheduleVOList:any;
  selectIndex = '0';
  regType:string;
  sb = true;
  ib = true;
  doctorDefail = "";
  schedules = {
    E_MORNING:'凌晨',
    MORNING:'上午',
    NOON:'中午',
    AFTERNOON:'下午',
    EVENING:'夜间',
    ALLDAY:'全天',
    DAY:"白天"
  };
  constructor(public cacheService: CacheService, public navCtrl: NavController, public navParams: NavParams,public accountService: AccountService, public widgetService: WidgetService,
              public modalCtrl: ModalController, public httpService: HttpService,public nativePageTransitions: NativePageTransitions,public dateService?: DateService,public app?: AppConfig) {
    super(navCtrl, navParams, nativePageTransitions,dateService);
    this.dept = this.cacheService.getClinicParam('dept');
    this.expertInfo = this.cacheService.getClinicParam('expert') || {};
    this.doctorDefail = this.app.url.mobile + "/mobile/image/hospital/10035/expert/";
    if(this.expertInfo && this.expertInfo.id){
      this.regType = 'expert';
      this.regScheduleVOList = this.handleScheduleList(this.expertInfo.regScheduleVOList);
      this.commonInfo = this.expertInfo;
    }else{
      this.regType = 'common';
      this.regScheduleVOList = this.handleScheduleList(this.dept.regScheduleVOList);
      this.commonInfo = this.dept;
    }
    this.guahaoType = this.cacheService.getClinicParam('guahaoType');

  }

  ionViewWillEnter() {

  }
  chooseSchedule(schedule) {
    if(this.guahaoType == 'SCHEDULE_REALTIME'){
      if(schedule.leftNum == 0){
        return;
      }
      super.chooseSchedule(true, schedule, this.accountService, this.app, this.modalCtrl, this.cacheService);
    }else{
      this.httpService.getTimeListBySchedule(schedule.scheduleId,this.dept.hospitalId)
        .subscribe(json => {
          if (json.success) {
            schedule.times = json.data.times;
            if(!schedule.times || schedule.times.length == 0){
              this.widgetService.toast('暂无排班');
              return;
            }
            super.chooseSchedule(true, schedule, this.accountService, this.app, this.modalCtrl, this.cacheService);
          }
        });
    }


  }



}
