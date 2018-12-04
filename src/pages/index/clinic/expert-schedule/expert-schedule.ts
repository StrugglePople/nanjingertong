import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {BaseClinicPage} from "../baseClinic";
import {DateService} from "../../../../providers/date.service";
import {AppConfig} from "../../../../app/app.config";
import {CacheService} from "../../../../providers/cache.service";
import {HttpService} from "../../../../providers/http.service";
import {AccountService} from "../../../../providers/account.service";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the ExpertSchedulePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-expert-schedule',
  templateUrl: 'expert-schedule.html',
})
export class ExpertSchedulePage extends BaseClinicPage {

  dateItems;

  expert;

  dept;

  timeQj;

  aDateItems;

  pDateItems;

  eDateItems;

  today;

  attentionId = 0;

  // attentionNum = 0;
  sb = true;

  ib = true;

  schedule;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dateService: DateService,
              public app: AppConfig, public cacheService: CacheService, public httpService: HttpService,
              public accountService: AccountService, public modalCtrl: ModalController, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions, dateService);
    //重新赋值,相当于willshow
    this.dateItems = this.getDateItems(this.app.hospitalConfig.scheduleDaysForReg);
    this.expert = this.cacheService.getClinicParam('expert');
    this.dept = this.cacheService.getClinicParam('dept');
    this.timeQj = this.dateItems[0].dateStr1 + '~' +
      this.dateItems[this.dateItems.length - 1].dateStr1;
    let map = this.getDateItemsBySchedule(this.expert.regScheduleVOList, this.dateItems);
    this.aDateItems = map.a;
    this.pDateItems = map.p;
    this.eDateItems = map.e;
    this.today = this.dateService.format(new Date());
    this.expert.src = this.expert.picName.indexOf('http') > -1 ? this.expert.picName + '?' + new Date().getTime(): this.app.url.mobile + '/mobile/image/hospital/' + this.app.hospitalId + '/expert/' + this.expert.picName;
  }

  ionViewWillEnter() {
    this.httpService.testAttention(this.expert.id)
      .subscribe(json => {
        if (json.success) {
          this.attentionId = json.data.favoritesId;
          // this.attentionNum = json.data.targetFavCount;
        }
      });
  }

  ionViewDidEnter() {
    if (this.cacheService.getClinicParam('selectDate') && this.app.hospitalConfig.isExpertTimePeriodSchedule) {
      let schedule;
      for (let i = 0; i < this.expert.regScheduleVOList.length; i++) {
        let tempSchedule = this.expert.regScheduleVOList[i];
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

  //关注
  attention() {
    if (!this.accountService.isLogin()) {
      this.navCtrl.push('LoginPage');
      return;
    }
    if (this.attentionId > 0) {
      this.httpService.cancelAttention(this.attentionId)
        .subscribe(json => {
          if (json.success) {
            this.attentionId = 0;
          }
        })
    } else {
      this.httpService.addAttention(this.expert.id, 'EXPERT')
        .subscribe(json => {
          if (json.success) {
            this.attentionId = json.data;
          }
        })
    }
  }

  chooseSchedule(schedule) {
    super.chooseSchedule(true, schedule, this.accountService, this.app, this.modalCtrl, this.cacheService);
  }

}
