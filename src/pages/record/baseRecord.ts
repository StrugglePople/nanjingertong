/**
 * Created by Administrator on 2017/6/30 0030.
 */
import { NavController, NavParams } from 'ionic-angular';
import {BasePage} from "../../app/base";
import {AccountService} from "../../providers/account.service";
import {WidgetService} from "../../providers/widget.service";
import {DateService} from "../../providers/date.service";
import {AppConfig} from "../../app/app.config";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

export class BaseRecordPage extends BasePage{

  member: any = {};

  beginDate:string;

  endDate: string;

  dataList: Array<any> = [];

  maxDate: string;

  yearMonth = '';
  yearMonthDay='';
  hasMore = false;

  constructor(public accountService: AccountService,public widgetService: WidgetService,
              public dateService: DateService, public navCtrl: NavController, public navParams: NavParams,
              public app?: AppConfig, public nativePageTransitions?: NativePageTransitions) {
    super(navCtrl, navParams);
    this.maxDate = this.dateService.format(new Date());
  }

  //页面加载完成就去获取数据
  ionViewDidLoad() {
    this.beginDate = this.dateService.format(new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30));
    this.endDate = this.dateService.format(new Date());
    // this.afterSelectMember();
  }

  noMembers() {
    this.widgetService.confirm('添加持卡人', ()=> {
      this.navCtrl.push('MemberInfoPage', {member: {}});
    })
  }

  //选择完病人后加载数据
  afterSelectMember() {
    let member = this.accountService.getSelectMember() || {};
    this.member = member;
    if (!member || !member.id) return;
    if ((!member.cards || member.cards.length == 0) && !this.app.hospitalConfig.noCard) {
      this.widgetService.confirm('您还没添加就诊卡，去添加', () => {
        this.navCtrl.push('MemberListPage');
      });
      return;
    }
    this.doLoad();
  }

  doLoad(infiniteScroll?: any) {
    this.yearMonth = '';
    this.yearMonthDay = '';
    this.dataList = [];
    this.hasMore = false;
    this.getServiceData(infiniteScroll);
  };

  loadData(infiniteScroll?: any) {
    this.dataList = [];
    if (!this.member || !this.member.id) {
      this.widgetService.toast('请先选择持卡人');
      return;
    }

    this.getServiceData(infiniteScroll,true);
  };

  //各个继承的class需要重写此真实获取数据的方法
  getServiceData(infiniteScroll?: any,refresh?) {}

  //除预约挂号外的组装post返回的数据
  packageData(data) {
    let map = {},
      tempArray = [];
    for (let item of data) {
      let array = map[item.reportDate] || [];
      array.push(item);
      map[item.reportDate] = array;
    }
    for (let x in map) {
      tempArray.push({
        date: x,
        list: map[x]
      })
    }
    return tempArray;
  }

  //预约挂号组装post返回数据
  packageData2(data) {
    let map = {},
      tempArray = [];
    for (let item of data) {
      let array = map[item.clinicDate] || [];
      if (item.deptName && item.deptName.indexOf('|') > -1) {
          let tempArray = item.deptName.split('|');
          item.addressId = tempArray[0];
          item.deptId = tempArray[1];
          item.deptName = tempArray[2];
      }
      if (item.expertName && item.expertName.indexOf('|') > -1) {
        let tempArray = item.expertName.split('|');
        item.expertId = tempArray[0];
        item.expertName = tempArray[1];
      }
      array.push(item);
      map[item.clinicDate || item.regDate] = array;
    }
    for (let x in map) {
      tempArray.push({
        date: x,
        list: map[x]
      })
    }
    return tempArray;
  }

  //跳转到各自的详情界面
  showDetailView(page, item) {
    this.navCtrl.push(page, {data: item});
  }
  pushMemberSelectView(){

    if(this.yearMonth){
      this.yearMonth = '';
    }
    this.navCtrl.push('MemberSelectModalPage',null,null, ()=> {
      this.dataList = [];
    });
  }

}

