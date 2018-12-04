import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {BaseClinicPage} from "../baseClinic";
import {AppConfig} from "../../../../app/app.config";
import {CacheService} from "../../../../providers/cache.service";
import {DateService} from "../../../../providers/date.service";
import {AccountService} from "../../../../providers/account.service";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the DeptSchedulePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dept-schedule',
  templateUrl: 'dept-schedule.html',
})
export class DeptSchedulePage extends BaseClinicPage {

  dateItems;

  dept;

  timeQj;

  aDateItems;

  pDateItems;

  eDateItems;

  today;

  ib: false; //简介展开标记

  schedule;

  wtimes;

  constructor(public app: AppConfig, public navCtrl: NavController, public navParams: NavParams,
              public cacheService: CacheService, public dateService: DateService, public accountService: AccountService,
              public modalCtrl: ModalController, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions, dateService);
    this.dateItems = this.getDateItems(this.app.hospitalConfig.scheduleDaysForReg);
    this.dept = this.cacheService.getClinicParam('dept');
    this.timeQj = this.dateItems[0].dateStr1 + ' ~ ' + this.dateItems[this.dateItems.length - 1].dateStr1;
    let map = this.getDateItemsBySchedule(this.dept.regScheduleVOList, this.dateItems);
    this.aDateItems = map.a;
    this.pDateItems = map.p;
    this.eDateItems = map.e;
    this.today = this.dateService.format(new Date());
  }

  ionViewDidEnter() {
    if (this.cacheService.getClinicParam('selectDate') && this.app.hospitalConfig.isDeptTimePeriodSchedule) {
      let schedule;
      for (let i = 0; i < this.dept.regScheduleVOList.length; i++) {
        let tempSchedule = this.dept.regScheduleVOList[i];
        if (tempSchedule.regDate == this.cacheService.getClinicParam('selectDate').dateStr1) {
          schedule = tempSchedule;
        }
      }
      if (schedule.leftNum > 0) {
        this.chooseSchedule(schedule);
      }
    }
    this.cacheService.setClinicParam('selectDate', '');
  }

  chooseSchedule(schedule) {
    super.chooseSchedule(false, schedule, this.accountService, this.app, this.modalCtrl, this.cacheService);
  }

}
