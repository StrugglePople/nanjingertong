import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {CacheService} from "../../../../providers/cache.service";
import {AppConfig} from "../../../../app/app.config";
import {DateService} from "../../../../providers/date.service";
import {AccountService} from "../../../../providers/account.service";
import {BasePage} from "../../../../app/base";
import {WidgetService} from "../../../../providers/widget.service";
import {HttpService} from "../../../../providers/http.service";
import {AppointmentRecordDetailPage} from "../../../record/appointment-record-detail/appointment-record-detail";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the ClinicInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-clinic-info',
  templateUrl: 'clinic-info.html',
})
export class ClinicInfoPage extends BasePage{
  expert;
  dept = {};
  schedule;
  time;
  member = {};
  card = {};
  hospitalName;
  checked;
  clinicStr;
  schedulesTime = {
    E_MORNING:'凌晨',
    MORNING:'上午',
    NOON:'中午',
    AFTERNOON:'下午',
    EVENING:'夜间',
    ALLDAY:'全天',
    DAY:"白天"
  };
  constructor(public cacheService: CacheService, public navCtrl: NavController, public navParams: NavParams,
              public app: AppConfig, public dateService: DateService, public accountService: AccountService,
              public widgetService: WidgetService, public httpService: HttpService, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.accountService.clearSelectCard();
    this.expert = this.cacheService.getClinicParam('expert');
    this.dept = this.cacheService.getClinicParam('dept');
    this.time = this.cacheService.getClinicParam('scheduleTime');
    this.schedule = this.cacheService.getClinicParam('schedule');
    this.hospitalName = this.app.hospitalName;
    this.clinicStr = this.dateService.format(new Date()) == this.cacheService.getClinicParam('schedule').regDate ? '挂号' : '预约';
  }

  ionViewWillEnter() {
    this.card = this.accountService.getSelectCard() || {};
    this.member = this.accountService.getMemberById(this.card['patientId']) || {};

  }

  showClinicNoteView() {
    this.navCtrl.push('HtmlInfoPage', {type: (this.clinicStr == '预约' ? 'GUAHAO' : 'REAL_GUAHAO')})
  }

  //check挂号预约须知
  changeChecked() {
    this.cacheService.set('clinic.note.checked', true);
  }

  //预约挂号
  commitClinic() {
    if(!this.card || (!this.card['id'] && !this.app.hospitalConfig.noCard) || !this.card['medicalCardNo']){
      this.widgetService.toast('请先选择用户');
      return;
    }
    this.commonClinic();
    /*if(this.clinicStr == '预约'){
      this.commonClinic();
    }else{
      this.widgetService.confirm('挂号费用将从就诊卡里直接扣除', ()=> {
        this.commonClinic();
      });
    }*/
  }

  commonClinic(){
    let param = this.getClinicParam();
    this.httpService.canOrNotSubmit(param)
      .subscribe(json => {
        if (json.success) {
          if(json.errMsg){
            this.widgetService.alert(json.errMsg,()=>{
              this.nextFunction(param);
            })
          }else{
            this.nextFunction(param);
          }

        }else{
          this.widgetService.alert(json.errMsg);
        }
      });

  }
  nextFunction(param){
    this.httpService.commitClinic(param)
      .subscribe(json => {
        if (json.success) {
          if(json.data && !json.data.tradeNo){
            let str = this.clinicStr + '成功！';
            let appointId = json.data;
            this.widgetService.confirm(str + '，请在15分钟之内完成支付；您也可查看预约挂号记录完成支付，本平台仅支持全额自费支付，是否需要继续？',()=>{
              this.httpService.confirmReg(json.data)
                .subscribe(json => {
                  if (json.success) {

                    let data = {
                      trade_no: json.data.tradeNo,
                      partner_sign: json.data.partnerSign,
                      businessId: json.data.businessId,
                      appointId:appointId,
                      source: 'confirmPay',
                      type : this.clinicStr
                    };
                    this.httpService.summary(json.data.partnerSign, json.data.tradeNo, '')
                      .subscribe(json => {
                        data['fee'] = json.trade_fee;
                        this.cacheService.set("cache.selectPayViewData", data);
                        this.navCtrl.push('PaySelectWayPage');
                      })
                  }
                })

            },null,null,null,()=>{
              this.httpService.getRegDetail(json.data)
                .subscribe(json1 => {
                  if (json1.success) {
                    this.cacheService.clearDiagnoseParam();
                    this.navCtrl.push('AppointmentRecordDetailPage',json1.data);
                  }
                })

            });

          }else{
            let cacheParam = this.cacheService.get('cache.clinic.param');
            let data = {
              trade_no: json.data.tradeNo,
              partner_sign: json.data.partnerSign,
              expert: cacheParam['expert'],
              dept: cacheParam['dept'],
              schedule: cacheParam['schedule'],
              time: cacheParam['scheduleTime'],
              businessId: json.data.businessId,
              source: 'regPay'
            };
            this.httpService.summary(data.partner_sign, data.trade_no, '')
              .subscribe(json => {
                data['fee'] = json.trade_fee;
                this.cacheService.set("cache.selectPayViewData", data);
                this.navCtrl.push('PaySelectWayPage');
              })
          }
        }
      })
  }

  //获取请求的参数
  getClinicParam() {
    let param = this.cacheService.get('cache.clinic.param'),
      regParam = {};
    if(this.card['medicalCardType'] !== '身份证'){
      regParam['medicalCardIdStr'] = this.card['aesId'];
    }
    regParam['accountIdStr'] = this.app.session.id;
    regParam['patientsIdStr'] = this.member['aesId'];
    regParam['scheduleId'] = param.schedule.scheduleId;
    regParam['deptId'] = param.dept.id;
    regParam['hospitalId'] = param.dept.hospitalId;
    regParam['regDate'] = param.schedule.regDate;
    regParam['fee'] = param.schedule.price;
    if (param.expert) {
      regParam['expertId'] = param.expert.id;
    }
    regParam['regTime'] = param.schedule.regTime;
    if(param.scheduleTime){
      regParam['visitTime'] = param.scheduleTime.timeline;
      regParam['visitNo'] = param.scheduleTime.visitNO;
    }
    return regParam;
  }
}
