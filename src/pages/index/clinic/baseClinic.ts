import {BasePage} from "../../../app/base";
import {ModalController, NavController, NavParams} from "ionic-angular";
import {DateService} from "../../../providers/date.service";
import {CloneVisitor} from "@angular/compiler/src/i18n/i18n_ast";
import {CopyConfig} from "@ionic/app-scripts/dist/copy";
import {AccountService} from "../../../providers/account.service";
import {AppConfig} from "../../../app/app.config";
import {CacheService} from "../../../providers/cache.service";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
/**
 * Created by Administrator on 2017/7/24 0024.
 */

export class BaseClinicPage extends BasePage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public nativePageTransitions?: NativePageTransitions,
              public dateService?: DateService) {
    super(navCtrl, navParams,nativePageTransitions);
  }

  //一段范围内的日期
  getDateItems(days) {
    let current = new Date(),
      weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      array = [];
    for (let i = 0; i < days; i++) {
      let date = new Date(current.getTime() + (i + 1) * 24*60*60*1000);
      array.push({
        date: date,
        week: weekDay[date.getDay()],
        dateStr: this.dateService.formatWithPatternDate('mm-dd', date),
        dateStr1: this.dateService.formatWithPatternDate('yyyy-mm-dd', date)
      })
    }
    return array;
  }

  //把排班放到对应的日期对象中
  getDateItemsBySchedule(scheduleList, dateItems) {
    let map = {'a': {}, 'p': {}, 'e': {}};
    for (let i = 0; i < scheduleList.length; i++) {
      let schedule = scheduleList[i];
      if (schedule.times) {
        schedule.leftNum = 0;
        for (let time of schedule.times) {
          schedule.leftNum += time.leftNum;
        }
      }

      if (schedule.regTime == 'MORNING') {
        map['a'][schedule.regDate] = schedule;
      } else if (schedule.regTime == 'AFTERNOON') {
        map['p'][schedule.regDate] = schedule;
      } else {
        map['e'][schedule.regDate] = schedule;
      }
    }

    let aDateItems = this.cloneArray(dateItems),
      pDateItems = this.cloneArray(dateItems),
      eDateItems = this.cloneArray(dateItems);
    for (let i = 0; i < aDateItems.length; i++) {
      aDateItems[i]['schedule'] = map.a[aDateItems[i]['dateStr1']];
    }
    for (let i = 0; i < pDateItems.length; i++) {
      pDateItems[i]['schedule'] = map.p[pDateItems[i]['dateStr1']];
    }
    for (let i = 0; i < eDateItems.length; i++) {
      eDateItems[i]['schedule'] = map.e[eDateItems[i]['dateStr1']];
    }
    return {a: aDateItems, p: pDateItems, e: eDateItems};
  }

  //把排班放到对应的日期对象中  new
  handleScheduleList(scheduleList) {
    let array = [];
    let map = {};
    for (let item of scheduleList) {
      if (!map[item.regDate]) {
        map[item.regDate] = [];
        /*{
          MORNING: "",
          AFTERNOON: "",
          EVENING: ''
        };*/
      }
      map[item.regDate].push(item);
    }
    for (let x in map) {
      array.push({ date: x, map: map[x], week:this.dateService.getWeek(x)});
    }
    return array;
  }

  //过滤科室
  filterDeparts(type, deptList, keys) {
    let sels = [];
    keys = keys.toUpperCase();
    if (type == 0) {
      for(let i=0;i<deptList.length;i++ ) {
        if(!deptList[i].shortPinyin){
          deptList[i].shortPinyin = deptList[i].shortPinYin;
        }
        if( deptList[i].name.indexOf(keys) > -1 || deptList[i].shortPinyin.indexOf(keys) > -1) {
          sels.push(deptList[i]);
        }
      }
    } else {
      for (let i = 0; i < deptList.length; i++) {
        if(deptList[i].childDeptList.length === 0){
          let item = deptList[i];
          if (item.name.indexOf(keys) > -1 || item.shortPinyin.indexOf(keys) > -1) {
            sels.push(item);
          }
        }else {
          for (let j = 0; j < deptList[i].childDeptList.length; j++) {
            let item = deptList[i].childDeptList[j];
            if (item.name.indexOf(keys) > -1 || item.shortPinyin.indexOf(keys) > -1) {
              sels.push(item);
            }
          }
        }
      }
    }
    return sels;
  }

  //选择排班
  chooseSchedule(isExpert, schedule, accountService: AccountService, app: AppConfig, modalCtrl: ModalController,
                cacheService:CacheService) {
    // if (schedule.leftNum == 0) return;
    if (!accountService.isLogin()) {
      this.navCtrl.push('LoginPage');
      return;
    }
    // let isTime = isExpert ? app.hospitalConfig.isExpertTimePeriodSchedule : app.hospitalConfig.isDeptTimePeriodSchedule;
    let isTime = schedule.times ? true:false;
    if (isTime) {
      //如果有时间段获取时间点，那就显示modal,没有的话直接去挂号
      this['schedule'] = schedule;
      /*let newArray = [],tmp = {};
      for(let j = 0;j < schedule.times.length;j++){
        for(let a = j+1;a < schedule.times.length;a++){
          if(schedule.times[j].timeline.split("-")[0].replace(':','') - 0 > schedule.times[a].timeline.split("-")[0].replace(':','') - 0){
            tmp = schedule.times[j];
            schedule.times[j] = schedule.times[a];
            schedule.times[a] = tmp;
          }
        }
      }

      for (let i = 0; i < schedule.times.length; i = i + 5) {
        newArray.push(schedule.times.slice(i, i + 5));
      }*/
      let ScheduleModal = modalCtrl.create('ScheduleListModalPage',
        {schedule: this['schedule'], wtimes: schedule.times},{
          showBackdrop:true,
          enableBackdropDismiss:true,
          cssClass:'opacity-3'
        });
      ScheduleModal.onDidDismiss(data => {
        if (!data) return;
        cacheService.setClinicParam('schedule', this['schedule']);
        cacheService.setClinicParam('scheduleTime', data.time);
        accountService.clearSelectMember();
        this.navCtrl.push('ClinicInfoPage');
      });
      ScheduleModal.present();
    } else {
      if (cacheService.getClinicParam('selectDate')) return;
      this['schedule'] = schedule;
      cacheService.setClinicParam('schedule', this['schedule']);
      cacheService.setClinicParam('scheduleTime', '');
      if (!isExpert) {
        cacheService.setClinicParam('expert', '');
      }
      accountService.clearSelectMember();
      this.navCtrl.push('ClinicInfoPage');
    }
  };
}
