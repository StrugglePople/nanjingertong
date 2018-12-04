import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Select} from 'ionic-angular';
import {AppConfig} from "../../../app/app.config";
import {CacheService} from "../../../providers/cache.service";
import {WidgetService} from "../../../providers/widget.service";
import {HttpService} from "../../../providers/http.service";
import {AccountService} from "../../../providers/account.service";
declare let rootPathAll:any;
/**
 * Generated class for the AddCard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-card',
  templateUrl: 'add-card.html'
})
export class AddCardPage {

  @ViewChild('sel') sel: Select;

  hospitalName;

  hospitalConfig;

  type;

  typeStr;

  member;

  card = {};

  cardTypes;
  iconImgSrc;
  hideInputCard:boolean = false;
  hasDefault:any ='';
  constructor(public app: AppConfig, public widgetService: WidgetService, public cacheService: CacheService,
              public accountService: AccountService, public httpService: HttpService, public navCtrl: NavController,
              public navParams: NavParams) {
    this.hospitalName = this.app.hospitalName;
    this.hospitalConfig = this.app.hospitalConfig;
    this.type = this.navParams.data.type;
    this.typeStr = this.type == 'jiuZhen' ? '就诊卡' : '住院号';
    this.member = this.navParams.data.member;
    this.iconImgSrc = "assets/image/common/logo.png";
    let cards = this.cacheService.get('cache.cardTypes');
    if(cards && cards.length){
      for(let i = 0;i < cards.length;i++){
        if(cards[i].name == '身份证'){
          cards.splice(i,1);
          break;
        }
        this.cardTypes =  cards;
      }
    }
    if (this.cardTypes.length == 1) {
      this.select(this.cardTypes[0])
    }
  }

  ionViewDidLoad() {
  }
  //就诊卡号改变时
  changeCardNo(cardNo){
    cardNo = cardNo.replace(/\s/g,"");
    if(this.card['medicalCardType'] == "医保卡"){
      if(cardNo.length > 0 && cardNo.length < 4){
        setTimeout(()=>{
          this.card['medicalCardNo'] = "0000";
        })
      }else if(cardNo.length > 4){
        this.card['medicalCardNo'] = cardNo.slice(0,4) + " " + cardNo.slice(4)
      }else if(!cardNo){
        setTimeout(()=>{
          this.card['medicalCardNo'] = "0000";
        })
      }
    }

  }

  //选择卡类型后
  select(item) {
    this.card['medicalCardTypeId'] = item.id;
    this.card['medicalCardType'] = item.name;
    this.card['medicalCardNo'] = '';
    this.hasDefault = '';
    if(item.name == '无卡'){
      this.hideInputCard = true;
      this.card['medicalCardNo'] = this.member.paperNo;
    }else if (item.name == '医保卡'){
      this.card['medicalCardNo'] = '0000 ' + this.card['medicalCardNo'];
      this.hasDefault = '0000 ';
    }
  }

  //保存卡
  save() {
    /*if(1){
      this.widgetService.toast('查询记录详情失败');
      setTimeout(()=>{
        this.navCtrl.parent.select(0);
        // this.navCtrl.setPages([{page:'TabsPage',params:{needSetRoot:true}},{page:'MorePage'}]);
        // let adf = this.navCtrl.insert(1,'IndexPage',{needSetRoot:true});
        this.navCtrl.pop();
        this.navCtrl.push('MorePage');
        // this.navCtrl.popToRoot();
        // alert(this.navCtrl.length());
        // this.navCtrl.remove(this.navCtrl.length()-2,2);

        let ss = 0;
      },1000);
      return
    }*/
    if(!this.card['medicalCardNo'] ) {
      this.widgetService.toast('请填写' + this.typeStr + '！');
      return;
    }
    if(this.type != 'jiuZhen'){
      this.card['medicalCardType'] = "住院号";
      this.card['medicalCardTypeId'] = this.app.zyCardTypeId;
    }
    if (this.hospitalConfig.bindCard == 'CARDTYPE' && !this.card['medicalCardType']) {
      this.widgetService.toast('请选择卡类型');
      return;
    }
    let data = {...this.card};
    data['accountIdStr'] = this.app.session.id;
    data['patientIdStr'] = this.member.aesId;
    data['patientName'] = this.member.name;
    data['name'] = this.member.name;
    data['mobileNo'] = this.member.mobileNo;
    data['medicalCardNo'] = data['medicalCardNo'].replace(/\s/g,'');
    /*if(data['medicalCardType'] == '医保卡'){
      data['medicalCardNo'] = '000' + data['medicalCardNo'];
    }*/

    this.httpService.saveCard(data)
      .subscribe(json => {
        if(json.success) {
          if (this.type == 'jiuZhen') {
            this.accountService.addCardCache(json.data);
            this.accountService.setCardsToAccount();
          } else {
            this.accountService.addZhuYuanCache(json.data);
            this.accountService.setZhuYuanToPatient(json.data);
          }
          this.widgetService.toast('添加成功', () => {
            this.navCtrl.pop();
          });
        }
      });
  }
}
