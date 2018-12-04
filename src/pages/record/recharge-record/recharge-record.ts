import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BaseRecordPage} from "../baseRecord";
import {AccountService} from "../../../providers/account.service";
import {WidgetService} from "../../../providers/widget.service";
import {HttpService} from "../../../providers/http.service";
import {DateService} from "../../../providers/date.service";
import {BasePage} from "../../../app/base";
import {AppConfig} from "../../../app/app.config";
/**
 * Generated class for the AppointmentRecord page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-recharge-record',
  templateUrl: 'recharge-record.html',
})
export class RrechargeRecordPage extends BasePage {

  rechargeStatus:any;
  dataList:any;
  member:any;
  card:any;
  chargeType:any;
  noClear:any = false;
  constructor(public accountService: AccountService,public widgetService: WidgetService,
              public httpService:HttpService, public dateService: DateService, public navCtrl: NavController,
              public navParams: NavParams, public event:Events,public app?: AppConfig) {
    super(navCtrl, navParams);
    this.chargeType = this.navParams.data.chargeType;
    this.noClear = this.navParams.data.noClear;
    if(!this.noClear){
      this.accountService.clearSelectCard();

    }
    this.rechargeStatus = {
      'INIT': '等待付款',
      'FAIL': '交易失败',
      'CLOSED': '交易关闭',
      'SUCCESS': '交易成功'
    };
    this.dataList = [];
    this.card = {};
  }
  ionViewDidLoad() {
    /*if(this.app.session.zhuYuan.length>0){
      this.accountService.setSelectCard(this.app.session.zhuYuan[0]);
    }*/

  }
  ionViewWillEnter() {
    if(this.dataList.length >0){
      return;
    }
    this.card = this.accountService.getSelectCard() || {};
    this.member = this.accountService.getMemberById(this.card['patientId']) || {};
    if(!this.card || !this.card['id']){
      return;
    }
    this.getServiceData();
  }


  getServiceData(infiniteScroll?: any) {
    let data = {
      /*inpatientNo : this.card.medicalCardNo,
      inpatientName:this.card.name*/
      medicalCardId  : this.card.id,
      medicalCardNo  : this.card.medicalCardNo,
      type:this.chargeType
    };
    this.httpService.getRechargeRecordBycard(data)
      .subscribe(json => {
        if (json.success) {
          this.dataList = json.data;
        } else {
        }
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      })
  }
  pushCardListView(){
    this.dataList = [];
    this.navCtrl.push('CardListPage',{'cardType':this.chargeType == 'MEDICAL_CARD_CHARGE'? '就诊卡':'住院号'});
  }
  showDetailView(page, item) {
    this.navCtrl.push(page, {data: item});
  }
}
