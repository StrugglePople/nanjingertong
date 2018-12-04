import {Component, Inject} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CacheService} from "../../../providers/cache.service";
import {AccountService} from "../../../providers/account.service";
import {ValidateService} from "../../../providers/validate.service";
import {HttpService} from "../../../providers/http.service";
import {WidgetService} from "../../../providers/widget.service";
import {DateService} from "../../../providers/date.service";
import {AppConfig} from "../../../app/app.config";

/**
 * Generated class for the MemberInfo page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-member-info',
  templateUrl: 'member-info.html',
})
export class MemberInfoPage {

  title?: string;

  member?: any = {};

  isDefault: boolean;

  constructor(public cacheService: CacheService, public accountService: AccountService, public validateService: ValidateService,
              public httpService: HttpService, public widgetService: WidgetService, @Inject('DataService') public dataService,
              public dateService: DateService, public app: AppConfig, public navCtrl: NavController, public navParams: NavParams) {
    this.cacheService.set('address','');
    this.member = { ...this.navParams.data.member };
    this.title = this.member.id > 0 ? '更新' : '保存';
    // initAddress();
    //默认就诊人
    // this.isDefault = this.cacheService.get('member.default') && (this.cacheService.get('member.default') == this.member.id)
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    this.member.cards = this.accountService.getCardsByPatientId(this.member.id);
    let address = this.cacheService.get('address');
    if(address && address.address0){
      this.member.shengCode = address.address0.provinceCode;
      this.member.shengName = address.address0.provinceName;
      this.member.shiCode = address.address1.cityCode;
      this.member.shiName = address.address1.cityName;
      this.member.quCode = address.address2.areaCode;
      this.member.quName = address.address2.areaName;
      this.member.zhenCode = address.address3.streetCode;
      this.member.zhenName = address.address3.streetName;
      let string = '';
      string += this.member.shengName+this.member.shiName+this.member.quName+this.member.zhenName+address.address4.address;
      this.member.address = string;
    }
    // this.initAddress();
  }

  //初始化地址（各个医院不一样）
  initAddress() {
    if (this.cacheService.get('address')) {
      this.member.address = this.cacheService.get('address');
      this.cacheService.set('address', '');
    }
    if (this.member.address) {
      let array = this.member.address.split('+'),
          string = '';
      for (let i = 0; i < array.length; i++) {
        let temArray = array[i].split(':');
        string += temArray[1];
      }
      this.member.addressStr = string;
    }
  }

  //身份证改变
  paperNoChange(paperNo) {
    if (!paperNo || paperNo.length != 18) return;
    let array = this.validateService.isChinaId(paperNo);
    if (array[0]) {
      this.member.birthday = array[1];
      this.member.sex = array[2];
    }
  }

  //跳往编辑地址界面
  chooseAddress() {
    if (this.member && this.member.address) {
      this.cacheService.set('address', this.member.address)
    } else {
      this.cacheService.removeKey('address');
    }
    this.navCtrl.push('AddressPage',this.member);
  };

  saveMember() {
    let address = this.cacheService.get('address');
    if(!this.member.address){
      this.widgetService.toast('请填写地址信息');
      return;
    }
    if(!this.member.name)  {
      this.widgetService.toast(this.dataService.msg.need_real_name);
      return;
    }
    if( !this.validateService.isName(this.member.name)) {
      this.widgetService.toast(this.dataService.msg.error_name);
      return;
    }
    if(!this.member.mobileNo) {
      this.widgetService.toast(this.dataService.msg.need_mobile);
      return;
    }
    if(!this.validateService.isMobile(this.member.mobileNo)) {
      this.widgetService.toast(this.dataService.msg.error_mobile);
      return;
    }
    if(!this.member.parentName){
      this.widgetService.toast('请输入家长姓名');
      return;
    }
    if(!this.member.paperNo) {
      /*if (!this.member.birthday) {
        this.widgetService.toast('请选择生日');
      }
      if (this.dateService.getAge(this.member.birthday) >= 14) {
        this.widgetService.toast('请输入身份证');
      } else {
        if (!this.validateJianhu(this.member)) {
          return;
        }
      }*/
      this.widgetService.toast('请输入身份证号码');
      return;
    } else {
      let array = this.validateService.isChinaId(this.member.paperNo);
      if(array[0] === false){
        this.widgetService.toast('您输入的身份证号码有误！');
        return;
      } else {
        if(this.member.sex && array[2] != this.member.sex){
          this.widgetService.toast('性别与身份证对应的性别不符合');
          return;
        }
        // if (this.member.birthday && this.dateService.getAge(this.member.birthday) < 14) {
        //   if (!this.validateJianhu(this.member)) {
        //     return;
        //   }
        // }
      }
    }
    if(!this.member.birthday){
      this.widgetService.toast('请输入生日');
      return;
    }
    if(!this.member.sex){
      this.widgetService.toast('请选择性别');
      return;
    }
    this.member.paperType = 'IDENTITY_CARD';
    this.member.accountIdStr = this.app.session.id;
    this.member.paperNo = this.member.paperNo.toUpperCase();
    this.httpService.saveMember(this.member)
      .subscribe(json => {
        if (json.success) {
          this.app.session.accounts = json.data;
          this.accountService.setCardsToAccount();
          for(let i = 0; i < this.app.session.accounts.length; i++) {
            if( this.member.name === this.app.session.accounts[i].name &&
              this.member.mobileNo === this.app.session.accounts[i].mobileNo ){
              this.member = {...this.app.session.accounts[i]};
              // this.initAddress();
              break;
            }
          }
          this.title = '更新';
          this.accountService.getCards(false);
          if (this.isDefault) {
            this.cacheService.set('member.default', this.member.id);
          } else {
            if (this.cacheService.get('member.default') && this.cacheService.get('member.default') == this.member.id) {
              this.cacheService.set('member.default', 0);
            }
          }
          this.widgetService.toast(json.errMsg);
        }
      });

  }

  //验证监护的一些数据
  validateJianhu(member): boolean {
    if (!member.parentIdCard) {
      this.widgetService.toast('请填写监护人身份信息!');
      return false;
    }
    if(!member.parentName || !this.validateService.isName(member.parentName)){
      this.widgetService.toast('请输入长度为2~32位的监护人姓名,且不能包含空格');
      return false;
    }
    if(!this.validateService.isIdCard(member.parentIdCard)){
      this.widgetService.toast('您输入的监护人身份证号码有误！');
      return false;
    }
    return true;
  }

  //删除病人
  deleteMember() {
    this.widgetService.confirm('是否删除持卡人，同时删除持卡人下的就诊卡？', () => {
      this.httpService.deleteMember(this.member.aesId)
        .subscribe(json => {
          if (json.success) {
            this.accountService.deleteMember(this.member.id);
            this.widgetService.toast(json.errMsg, () => {
              this.navCtrl.pop();
            });
          }
        })
    });
  };

  //跳往加卡界面（必须先保存有改动的数据）
  addCard(type,noCard?) {
    if (!this.member.id || this.member.id == 0) {
      this.widgetService.toast('请先保存持卡人');
      return;
    }
    let oldMember = this.accountService.getMemberById(this.member.id),flag = true;
    if(oldMember.cards.length >4 && type == 'jiuZhen'){
      this.widgetService.alert("一个人最多添加5张就诊卡");
      return;
    }
    if(this.member.name !== oldMember.name ) {
      flag = false;
    }else if(this.member.paperNo !== oldMember.paperNo){
      flag = false;
    }else if(this.member.sex !== oldMember.sex){
      flag = false;
    }else if(this.member.birthday !== oldMember.birthday){
      flag = false;
    }
    else if(this.member.mobileNo !== oldMember.mobileNo){
      flag = false;
    }
    else if(this.member.parentName !== oldMember.parentName){
      flag = false;
    }
    else if(this.member.address !== oldMember.address){
      flag = false;
    }

    if(!flag){
      this.widgetService.toast('请先保存持卡人信息！');
      return;
    }
    this.navCtrl.push('AddCardPage', {type: type, member: oldMember});
  }

  //跳往卡详情界面
  showCardInfo(card, type) {
    let oldMember = this.accountService.getMemberById(this.member.id);
    this.navCtrl.push('CardInfoPage', {card: card, type: type, member: oldMember})
  }
}
