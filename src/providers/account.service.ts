import {Inject, Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {AppConfig} from "../app/app.config";
import {Loading, LoadingController, Platform} from "ionic-angular";
import {CacheService} from "./cache.service";
import {WidgetService} from "./widget.service";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {SettingService} from "./setting.service";
declare let ZkPlugin:any;
/*
  Generated class for the AccountService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
/**
 * 账户服务
 */
@Injectable()
export class AccountService {

  constructor(public httpService: HttpService, public app: AppConfig, public cacheService: CacheService,public  settingService: SettingService,
              public platform: Platform,private loadingCtrl: LoadingController, @Inject('DataService') public dataService, public widgetService: WidgetService,
              private iab: InAppBrowser) {

  }
   dataInitForLaunch(callback?) {
    this.clearSelectMember();
     this.httpService.getVersion(false)
       .subscribe(data => {
         if (!data.isMust) {
           this.initSession(callback);
         } else {
           this.logout();
         }
         if (!data.isCatch) {
           let deferUpdate = this.cacheService.get('zhicall.app.deferUpdate');
           if (data.isNew && !data.isMust) {
             if (deferUpdate && (new Date().getTime() - deferUpdate < this.dataService.time.MILLIS_1_DAY)) {
               return;
             }
             this.widgetService.confirm('发现新版本' + data.version + ':  ' + data.content + '是否要立即更新？',
               () => {
                 let browser = this.iab.create(data.url, '_system');
                 browser.show();
               }, '版本更新', '立即更新');
             this.cacheService.set('zhicall.app.deferUpdate', new Date().getTime());
           }
         }
       });
  }
  initSession(callback?) {
    let val = this.cacheService.get('app.session');
    if (val) {
      this.app.session = val;
      this.app.session.accounts = [];
      this.app.session.cards = [];
      this.app.session.zhuYuan = [];
      this.getMembers(callback);
      this.getBaiduPushParam((param)=>{
        this.httpService.bindPush(param).subscribe((json)=>{
        });
      });

    }else{
      if (callback) callback();
    }
  }

  /**
   * 根据账号获取持卡人列表
   */
  getMembers(callback?) {
    let loader: Loading = this.loadingCtrl.create({
      content:'正在初始化账户信息',
      dismissOnPageChange:true
    });
    loader.present();
    this.httpService.post('getMembers', false, null, [this.app.session.id])
      .subscribe(data => {
        if (data.success) {
          this.app.session.accounts = data.data;
          if(data.data.length>0){
            this.setSelectMember(data.data[0].id);
          }

          this.getCards(false,function () {
            loader.dismiss();
          });
        }
      })
  }

  /**
   * 根据账号获取卡列表
   * @param hasLoading
   * @param callback
   */
  getCards(hasLoading, callback?: () => void) {
    this.httpService.post('getCards', hasLoading, {hospitalId:-1}, [this.app.session.id])
      .subscribe(data => {
        let cards = [];
        if(data && data.data && data.data.length){
          for(let i=0;i<data.data.length;i++){
            /*if(data.data[i].medicalCardType != '身份证'){
              cards.push(data.data[i]);
            }*/
            cards.push(data.data[i]);
          }
        }
        // this.app.session.cards = cards;
          this.app.session.cards = <any[]>(cards).filter(function (value, index: number, array) {
            return value.medicalCardValid;
          });
          /*this.app.session.zhuYuan = <any[]>(cards).filter(function (value, index: number, array) {
            return value.medicalCardType == '住院号';
          });*/
        // this.app.session.zhuYuan = array;
        // this.setZhuYuanToAccount();
        this.setCardsToAccount();
        if (callback) callback();
      })
  }
  /**
   * 退出登录
   */
  logout(){
    // this.unBindPush();
    this.app.session = '';
    this.cacheService.removeKey('app.session');
    this.clearSelectMember();
    this.clearDefaultMember();
    this.clearSelectCard();
  }

  /**
   * 从phoneGap插件中获取推送的设置参数
   * @param callback
   */
  getBaiduPushParam(callback?){
    let accountId = this.app.session.id;
    if(this.app.isInApp){
      ZkPlugin.baidupush("", (message)=> {
        // alert(JSON.stringify(message));
        // this.cacheService.set('channel_id',message.channelId);
        // this.cacheService.set('deviceUser_id',message.userId);
        let param = {
          deviceChannelId: message.channelId,
          deviceUserId: message.userId,
          deviceType: (this.platform.is("android")) ? '3' : '4',
          loginUserId: accountId,
          hospitalId:10035
        };
        if (typeof callback == "function") callback(param);
      }, (message)=> {
        // alert(message)
      });
    }

  }

  /**
   * 绑定推送参数到服务器上
   */


  /**
   * 解绑推送参数到服务器上
   */


  isLogin() {
    return  this.app.session ? true : false;
  }

//把住院号添加到病人下面  一个人绑定多张卡
  setZhuYuanToAccount() {
    if (!this.isLogin()) return;
    let cardMap = {};
    for (let item of this.app.session.zhuYuan) {
      if (cardMap[item.patientId]) {
        cardMap[item.patientId].push(item);
      } else {
        cardMap[item.patientId] = [item];
      }
    }
    for (let item of this.app.session.accounts) {
      item.zhuYuan = cardMap[item.id] || [];
    }
  }

  //把住院号添加到病人下面  一个人只绑定一张卡
  setZhuYuanToPatient(card) {
    if (!this.isLogin()) return;
    for (let item of this.app.session.accounts) {
      if (item.id == card.patientId) {
        item.zhuYuan.push(card);
        break;
      }
    }
  }

  //把住院号从病人下面删除
  deleteZhuYuanToPatient(card) {
    if (!this.isLogin()) return;
    for (let item of this.app.session.accounts) {
      if (item.id == card.patientId) {
        item.zhuYuan = null;
        break;
      }
    }
  }
  //把卡列表中对象放入病人对象下面
  setCardsToAccount() {
    if (!this.isLogin()) return;
    var cardMap = {};
    for (let item of this.app.session.cards) {
      if (cardMap[item.patientId]) {
        cardMap[item.patientId].push(item);
      } else {
        cardMap[item.patientId] = [item];
      }
    }
    for (let item of this.app.session.accounts) {
      item.cards = cardMap[item.id] || [];
    }
  }

  //获取默认病人
  getDefaultMember() {
    let val = this.cacheService.get('member.default');
    if (val) {
      return this.getMemberById(val);
    } else {
      return null;
    }
  }

  //清空默认病人缓存
  clearDefaultMember() {
    this.cacheService.removeKey('member.default');
  }

  //获取已选择的病人，如果没有则选择默认的病人
  getSelectMember() {
    let val = this.cacheService.get('member.select');
    if (val) {
      return this.getMemberById(val);
    } else {
      return this.getDefaultMember();
    }
  }

  //清空选择病人缓存
  clearSelectMember() {
    this.cacheService.removeKey('member.select');
  }

  //设置选择病人缓存
  setSelectMember(id) {
    if (!id) return;
    this.cacheService.set('member.select', id);
    return this.getSelectMember();
  }

  //获取病人
  getMemberById(id) {
    if (!this.isLogin()) return null;
    for (let item of this.app.session.accounts) {
      if (id - 0 == item.id) {
        return item;
      }
    }
    return null;
  }

  //删除病人从缓存中
  deleteMember(id) {
    let members = this.app.session.accounts;
    for (let i = 0; i < members.length; i++){
      if ( id - 0 === members[i].id - 0 ) {
        this.app.session.accounts.splice(i, 1);
        break;
      }
    }
  }

  //获取选择的卡缓存
  getSelectCard() {
    let val = this.cacheService.get('card.select');
    if (!val || !this.isLogin()) return null;
    return val;
  }

  //设置选泽的卡缓存
  setSelectCard(card) {
    this.cacheService.set('card.select', card);
  }

  //清空已选的卡缓存
  clearSelectCard() {
    this.cacheService.removeKey('card.select');
  }

  //根据病人id获取对应的卡列表
  getCardsByPatientId(id) {
    let cards = [];
    if(!id){
      return cards;
    }
    for (let item of this.app.session.cards) {
      if (id - 0 == item.patientId) {
        cards.push(item);
      }
    }
    return cards;
  }
  getZhuYuanByPatientId(id) {
    let cards = [];
    if(!id){
      return cards;
    }
    for (let item of this.app.session.zhuYuan) {
      if (id - 0 == item.patientId) {
        cards.push(item);
      }
    }
    return cards;
  }
  //从缓存中获取卡对象
  getCardById(id) {
    for (let item of this.app.session.cards) {
      if (id - 0 == item.patientId) {
        return item;
      }
    }
    return null;
  }

  //从缓存中删除卡对象
  deleteCard(id) {
    let cards = this.app.session.cards;
    for(var i = 0; i< cards.length; i++){
      if(id - 0 === cards[i].id){
        this.app.session.cards.splice(i,1);
        break;
      }
    }
  }
  //从缓存中删除住院号对象
  deleteZhuyuan(id) {
    let cards = this.app.session.zhuYuan;
    for(var i = 0; i< cards.length; i++){
      if(id - 0 === cards[i].id){
        this.app.session.zhuYuan.splice(i,1);
        break;
      }
    }
  }
  //把卡对象添加进缓存
  addCardCache(card) {
    this.app.session.cards.push(card);
  }

  addZhuYuanCache(card) {
    this.app.session.zhuYuan.push(card);
  }
}
