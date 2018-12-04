import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CacheService} from "../../../../providers/cache.service";
import {AppConfig} from "../../../../app/app.config";
import {DateService} from "../../../../providers/date.service";
import {AccountService} from "../../../../providers/account.service";
import {BasePage} from "../../../../app/base";
import {WidgetService} from "../../../../providers/widget.service";
import {HttpService} from "../../../../providers/http.service";
/**
 * Generated class for the ClinicInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-card-charge',
  templateUrl: 'card-charge.html',
})
export class CardCharge extends BasePage{
  member = {};
  card = {};
  balance:any;
  chargeMoney:any;

  constructor(public cacheService: CacheService, public navCtrl: NavController, public navParams: NavParams,
              public app: AppConfig, public dateService: DateService, public accountService: AccountService,
              public widgetService: WidgetService, public httpService: HttpService) {
    super(navCtrl, navParams);
    this.accountService.clearSelectCard();

  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.chargeMoney = '';
    let isLogin = this.accountService.isLogin();
    if (!isLogin) {
      this.navCtrl.push('LoginPage');
      return;
    }
    /*if(this.app.session.zhuYuan.length>0 && !this.accountService.getSelectCard()){
      this.accountService.setSelectCard(this.app.session.zhuYuan[0]);
      this.card = this.app.session.zhuYuan[0];
    }else{
      this.card = this.accountService.getSelectCard() || {};
    }*/
    this.card = this.accountService.getSelectCard() || {};

    this.member = this.accountService.getMemberById(this.card['patientId']) || {};
    if(!this.card || !this.card['aesId']){
      return;
    }
    this.showBlance(true);


  }
  showBlance(hasLoading){
    this.httpService.getCardBalance({medicalCardId:this.card['aesId']},hasLoading)
      .subscribe(json => {
        if (json.success) {
          this.balance = json.data;
        }else{
          this.balance = '获取余额失败';
        }
      });
  }
  chargeCard(){
    if(!this.card || !this.card['id']){
      this.widgetService.toast("请选择就诊卡");
      return;
    }
    if(!this.chargeMoney){
      this.widgetService.toast("请输入充值金额");
      return;
    }
    this.httpService.cardRecharge({
      accountIdStr: this.app.session.id,
      medicalCardId: this.card['id'],
      fee: this.chargeMoney,
      from:this.app.hospitalConfig.from
    }).subscribe(json => {
      if(json.success){
        let data = {
          trade_no: json.data.tradeNo,
          partner_sign: json.data.partnerSign,
          source: 'cardCharge'
        };
        this.httpService.summary(data.partner_sign, data.trade_no, '')
          .subscribe(json => {
            data['fee'] = json.trade_fee;
            this.cacheService.set("cache.selectPayViewData", data);
            this.navCtrl.push('PaySelectWayPage');
          })
      }

    });

  }



}
