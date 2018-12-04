import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {CacheService} from "../../../../providers/cache.service";
import {BaseClinicPage} from "../baseClinic";
import {HttpService} from "../../../../providers/http.service";
import {WidgetService} from "../../../../providers/widget.service";
import {AppConfig} from "../../../../app/app.config";

/**
 * Generated class for the DeptListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dept-info-list',
  templateUrl: 'dept-info-list.html',
})
export class DeptInfoListPage extends BaseClinicPage {
  depts;
  experts;
  searchDepts = [];
  searchExpert = [];
  searchStr;
  isExpert;
  searchValue:any = '';
  doctorDefail;
  showYuyue:boolean=false;
  constructor(public app: AppConfig,public cacheService: CacheService, public navCtrl: NavController, public navParams: NavParams,
              public widgetService: WidgetService,public httpService: HttpService,public actionSheetCtrl: ActionSheetController) {
    super(navCtrl, navParams);
    this.showYuyue = this.navParams.data.showYuyue;
    this.doctorDefail = this.app.url.mobile + "/mobile/image/hospital/10035/expert/";
    this.depts = this.cacheService.get('deptList');
    this.searchDepts = this.handleData(this.depts);
    this.isExpert = this.navParams.data.expert;
    if(this.isExpert){
      this.experts = this.navParams.data.allExpert;
    }
  }

  getItems(ev) {
    let val = ev.target.value;
    if (this.searchStr == val) return;
    this.searchStr = val;
    if (!this.searchStr) {
      this.searchDepts = this.handleData(this.depts);
      return;
    }
    if(this.isExpert){
      this.searchExpert = this.handleData(this.filterDeparts(0, this.experts, this.searchStr));
    }else{
      this.searchDepts = this.handleData(this.filterDeparts(0, this.depts, this.searchStr));
    }

  }

  handleData(depts) {
    let map = {};
    for (let i = 0; i < depts.length; i++) {
      var dept = depts[i],
        key = dept.shortPinyin.substr(0, 1);
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

  clickDept(dept) {
    this.cacheService.setClinicParam('dept', dept);
    this.cacheService.set('expertList', '');
    if (this.cacheService.getClinicParam('type') == 'clinic') {
      // this.navCtrl.push('ExpertListPage');
    } else if (this.cacheService.getClinicParam('type') == 'introduce') {
      if (this.cacheService.getClinicParam('sub.type') == 'dept') {
        /*this.httpService.getDeptDetailInfo(dept)
          .subscribe(json=> {
            if (json.success) {
              dept = json.data;
              this.cacheService.setClinicParam('dept',dept);
              this.navCtrl.push('SourceDetail');
            }
          });*/

        this.navCtrl.push('DeptInfoPage',{showYuyue:this.showYuyue});
      } else {
        this.cacheService.set('expertList', '');
        this.navCtrl.push('ExpertCommonListPage');
      }
    }else if(this.cacheService.getClinicParam('type') == 'visit') {
      /*if(1){
        return;
      }*/

      this.httpService.getVisitByDept(dept).subscribe(json => {
        if(json.success){
          if(json.data){
            this.navCtrl.push('VisitExpert',json.data);
          }else{
            this.widgetService.toast('暂无医生');
          }

        }

      })
    }
  }
  selectExpert(expert) {
    this.cacheService.clearClinicParam();
    this.cacheService.setClinicParam('type', 'clinic');
    this.cacheService.setClinicParam('expert', expert);
    if(1){  //expert.underDepts.length == 1
      // this.cacheService.setClinicParam('dept', expert.underDepts[0]);
      this.navCtrl.push('ExpertInfoPage');
    }else{
      let underDepts = [];
      for(let i=0;i<expert.underDepts.length;i++){
        let deptObject = {
          text:expert.underDepts[i].name,
          role: 'destructive',
          cssClass: 'dept-list',
          handler:()=>{
            this.cacheService.setClinicParam('dept', expert.underDepts[i]);
            this.navCtrl.push('ExpertInfoPage');
          }
        };
        underDepts.push(deptObject);
      }
      this.presentActionSheet(underDepts);

    }


  };
  presentActionSheet(buttons) {
    buttons.push(
      {
        text: '取消',
        role: 'cancel',
        cssClass: 'dept-cancel',
        handler: () => {
        }
      }
    );
    let actionSheet = this.actionSheetCtrl.create({
      // title: '请选择科室',
      cssClass:'expert-dept-select',
      buttons: buttons
    });

    actionSheet.present();
  }


}
