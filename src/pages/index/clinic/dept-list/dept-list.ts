import { Component,ViewChild } from '@angular/core';
import {ActionSheetController, Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {CacheService} from "../../../../providers/cache.service";
import {BaseClinicPage} from "../baseClinic";
import {HttpService} from "../../../../providers/http.service";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {AppConfig} from "../../../../app/app.config";
import {DateService} from "../../../../providers/date.service";
import {WidgetService} from "../../../../providers/widget.service";
/**
 * Generated class for the DeptListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dept-list',
  templateUrl: 'dept-list.html',
})
export class DeptListPage extends BaseClinicPage {
  depts;
  allExperts = [];

  searchDepts = [];
  searchExpert = [];
  isExpert:boolean = false;
  searchStr;
  selectOneDept = {};

  scrollHeight:any;
  experts = [];
  appointType:string;
  doctorDefail = '';
  iscallNum:any;
  @ViewChild(Content) content: Content;
  constructor(public cacheService: CacheService,public app: AppConfig, public navCtrl: NavController, public navParams: NavParams,
  public httpService: HttpService,public nativePageTransitions: NativePageTransitions,public actionSheetCtrl: ActionSheetController,
              public widgetService?: WidgetService) {
    super(navCtrl,navParams,nativePageTransitions);
    this.getAllExpert();
    this.iscallNum = this.navParams.data.type == 'callNum';
    this.doctorDefail = this.app.url.mobile + "/mobile/image/hospital/10035/expert/";
    this.depts = this.cacheService.get('deptList');
    this.searchDepts = this.handleData(this.depts);
    this.selectOneDept = this.searchDepts[0].list[0];
    this.appointType = this.cacheService.getClinicParam('type');
    if(this.iscallNum){

    }else{
      this.getScheduleList(this.selectOneDept);
    }

  }
  ionViewDidEnter() {
    this.scrollHeight = this.content.contentHeight - 44;

  }

  ionViewDidLoad() {
  }
  getAllExpert(){
    this.httpService.getAllExperts(true,true)
      .subscribe(json => {
        if(json.success){
          this.allExperts = json.data;
        }

      })
  }
  initDept(ev){
    this.isExpert = false;
      let val = ev.target.value;
    if (val) return;
    this.searchDepts = this.handleData(this.depts);
    this.selectOneDept = this.searchDepts[0].list[0];
    this.getScheduleList(this.selectOneDept);
  }

  getItems(isExpert?) {
    // let val = ev.target.value;
    // if (this.searchStr == val) return;
    // this.searchStr = val;
    if(!this.searchStr){
      this.widgetService.toast('请输入关键字');
      return;
    }
    this.isExpert = isExpert;
    if(isExpert){
      if(!this.searchStr){
        this.searchExpert = this.handleData(this.allExperts);
      }else{
        this.searchExpert = this.handleData(this.filterDeparts(0, this.allExperts, this.searchStr));
      }

    }else{
      if(!this.searchStr){
        this.searchDepts = this.handleData(this.depts);
      }else{
        this.searchDepts = this.handleData(this.filterDeparts(0, this.depts, this.searchStr));
      }
      this.experts = [];
      if(this.searchDepts.length > 0){
        this.selectOneDept = this.searchDepts[0].list[0];
        this.getScheduleList(this.selectOneDept);
      }

    }


  }



  clickDept(dept) {
    this.cacheService.setClinicParam('dept', dept);
    this.cacheService.set('expertList', '');

    /*if (this.cacheService.getClinicParam('type') == 'clinic') {
      this.navCtrl.push('ExpertListPage');
    } else if (this.cacheService.getClinicParam('type') == 'introduce') {
      if (this.cacheService.getClinicParam('sub.type') == 'dept') {
        this.navCtrl.push('DeptInfoPage');
      } else {
        this.cacheService.set('expertList', '');
        this.navCtrl.push('ExpertCommonListPage');
      }
    }*/
  }
  getScheduleList(dept) {
    this.experts = [];
    this.selectOneDept = dept;
    this.cacheService.setClinicParam('dept',dept);
    this.cacheService.set('expertList', '');
    this.httpService.getExpertByScheduleList(dept,
       '',this.appointType)
      .subscribe(json => {
        if (json.success) {
          this.experts = json.data;
        }
      })
  }

  //获取专家叫号信息
  getScheduleCllNumList(dept) {
    this.experts = [];
    this.selectOneDept = dept;
    this.cacheService.setClinicParam('dept',dept);
    this.cacheService.set('expertList', '');
    this.httpService.getExpertByScheduleList(dept,
      '',this.appointType)
      .subscribe(json => {
        if (json.success) {
          this.experts = json.data;
        }
      })
  }
  showExpertSchedule(expert) {
    if(this.iscallNum){
      return;
    }
    if(this.appointType == 'introduce'){
      this.cacheService.clearClinicParam();
      this.cacheService.setClinicParam('type', 'clinic');
      this.cacheService.setClinicParam('expert', expert);
      // this.cacheService.setClinicParam('dept', this.selectOneDept);
      this.navCtrl.push('ExpertInfoPage');
      return;
    }
    this.httpService.getScheduleListByExpert(this.cacheService.getClinicParam('dept'), expert.id)
      .subscribe(json => {
        if (json.success) {
          expert.regScheduleVOList = json.data.regScheduleVOList;
          this.cacheService.setClinicParam('expert', expert);
          this.navCtrl.push('SourceDetail');
          // this.navCtrl.push('ExpertSchedulePage');
        }
      })
  }
  showDeptSchedule() {
    let dept = this.cacheService.getClinicParam('dept');
    if(this.iscallNum){
      this.httpService.getScheduleCllNumList(dept.id)
        .subscribe(json => {
          if (json.success) {

          }
        });
      this.httpService.getCommonScheduleCllNum(dept.id)
        .subscribe(json => {
          if (json.success) {

          }
        });
      return;
    }
    this.httpService.getScheduleListByDept(dept)
      .subscribe(json => {
        if (json.success) {
          this.cacheService.setClinicParam('expert', {});
          dept.regScheduleVOList = json.data.regScheduleVOList || [];
          this.cacheService.setClinicParam('dept', dept);
          this.navCtrl.push('SourceDetail');
          // this.navCtrl.push('DeptSchedulePage');
        }
      })
  }
  handleData(depts) {
    let map = {};
    for (let i = 0; i < depts.length; i++) {
      let dept = depts[i];
      if(!dept.shortPinyin){
        dept.shortPinyin = dept.shortPinYin;
      }
      let key = dept.shortPinyin.substr(0, 1);
      if (!map[key]) {
        map[key] = [];
      }
      map[key].push(dept);
    }
    let array = [],
      keyArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'
        , 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (let i = 0; i < keyArray.length; i++) {
      if (map[keyArray[i]]) {
        array.push({key: keyArray[i], list: map[keyArray[i]]})
      }
    }
    return array;
  }


  selectExpert(expert,dept) {
    this.cacheService.setClinicParam('dept', dept);
    this.httpService.getScheduleListByExpert(dept, expert.id)
      .subscribe(json => {
        if (json.success) {
          expert.regScheduleVOList = json.data.regScheduleVOList;
          this.cacheService.setClinicParam('expert', expert);
          this.navCtrl.push('SourceDetail');
        }
      })


  };

}
