import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {CacheService} from "../../../../providers/cache.service";
import {HttpService} from "../../../../providers/http.service";
import {AppConfig} from "../../../../app/app.config";
import {DateService} from "../../../../providers/date.service";
import {BaseClinicPage} from "../baseClinic";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the ExpertListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-expert-list',
  templateUrl: 'expert-list.html',
})
export class ExpertListPage extends BaseClinicPage {

  title;

  selectIndex = '1';

  selectdate;

  dateItems;

  experts = [];

  itemWidth;

  constructor(public cacheService: CacheService, public navCtrl: NavController, public navParams: NavParams,
              public httpService: HttpService, public app: AppConfig, public dateService: DateService, plarform: Platform,
              public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions, dateService);
    this.title = this.cacheService.getClinicParam('dept').name || '专家列表';
    this.dateItems = this.getDateItems(this.app.hospitalConfig.scheduleDaysForReg);
    this.selectdate = this.dateItems[0];
    this.getScheduleList();
    this.itemWidth = plarform.width() / 7 /10;
  }

  segmentChanged(value) {
    this.getScheduleList();
  }

  //获取排班
  getScheduleList() {
    this.httpService.getExpertByScheduleList(this.cacheService.getClinicParam('dept'),
      this.selectIndex == '1' ? this.selectdate.date : '')
      .subscribe(json => {
        if (json.success) {
          this.getNumStatus(json.data, this.selectdate.date);
          this.experts = json.data;
        }
      })
  }

  //把预约还是挂号放到对应的日期中，把hasNum放到对应的排班中
  getNumStatus(array, date) {
    let btnTitle = '预约';
    if (date) {
      date = this.dateService.format(date);
      let now = this.dateService.format(new Date());
      if (now == date) {
        btnTitle = '挂号';
      }
    }
    for (let i = 0; i < array.length; i++) {
      let expert = array[i],
        scheduleList = expert.regScheduleVOList || [],
        hasNum = false;
      if(!expert.picName){
        expert.picName = '';
      }
      expert.src = expert.picName.indexOf('http') > -1 ? expert.picName + '?' + new Date().getTime(): this.app.url.mobile + '/mobile/image/hospital/' + this.app.hospitalId + '/expert/' + expert.picName;
      for (let j = 0; j < scheduleList.length; j++) {
        if (scheduleList[j].leftNum > 0) {
          hasNum = true;
          break;
        }
      }
      array[i].hasNum = hasNum;
      array[i].btnTitle = btnTitle;
    }
  }

  //选择日期获取排班
  chooseDate(date) {
    if (this.selectdate.dateStr == date.dateStr) return;
    this.selectdate = date;
    this.getScheduleList();
  }

  //获取某个专家排班
  showExpertSchedule(expert) {
    this.httpService.getScheduleListByExpert(this.cacheService.getClinicParam('dept'), expert.id)
      .subscribe(json => {
        if (json.success) {
          expert.regScheduleVOList = json.data.regScheduleVOList;
          this.cacheService.setClinicParam('expert', expert);
          if (this.selectIndex == '1') {
            this.cacheService.setClinicParam('selectDate', this.selectdate);
          }
          this.navCtrl.push('ExpertSchedulePage');
        }
      })
  }

  //获取科室排班
  showDeptSchedule() {
    let dept = this.cacheService.getClinicParam('dept');
    this.httpService.getScheduleListByDept(dept)
      .subscribe(json => {
        if (json.success) {
          this.cacheService.setClinicParam('expert', {});
          dept.regScheduleVOList = json.data.regScheduleVOList || [];
          this.cacheService.setClinicParam('dept', dept);
          this.navCtrl.push('DeptSchedulePage');
        }
      })
  }


}
