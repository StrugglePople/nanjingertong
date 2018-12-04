import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CacheService} from "../../../../providers/cache.service";
import {BasePage} from "../../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {HttpService} from "../../../../providers/http.service";
import {WidgetService} from "../../../../providers/widget.service";
import {AppConfig} from "../../../../app/app.config";

/**
 * Generated class for the DeptInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dept-info',
  templateUrl: 'dept-info.html',
})
export class DeptInfoPage extends BasePage{

  ib = true;

  dept;
  show;
  experts:any[] = [];
  showExperts:any[] = [];
  showYuyue:boolean=false;
  showMore:boolean = true;
  constructor(public cacheService: CacheService, public navCtrl: NavController, public navParams: NavParams, public app: AppConfig,
              public widgetService: WidgetService,public httpService: HttpService,public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.dept = this.cacheService.getClinicParam('dept');
    this.showYuyue = this.navParams.data.showYuyue;

    for (let expert of this.dept.doctors) {
      if(expert.picName){
        if(expert.picName.indexOf('http') > -1){
          expert.src = expert.picName + '?' + new Date().getTime();
        }else{
          expert.src = this.app.url.mobile + '/mobile/image/hospital/' + this.app.hospitalId + '/expert/' + expert.picName + '?' + new Date().getTime();
        }

      }else{
        expert.src = this.app.url.mobile + '/mobile/image/hospital/' + this.app.hospitalId + '/expert/default?' + new Date().getTime();
      }
    }
    this.experts = this.dept.doctors;
    if(this.experts.length <=8){
      this.showExperts = this.experts;
    }else{
      this.showExperts = this.experts.slice(0,8);
    }

  }
  ionViewDidLoad() {
    /*this.httpService.getDeptDetailInfo(this.dept)
      .subscribe(json=> {
        if (json.success) {
          this.dept = json.data;
        }
      });*/
  }
  ionViewWillEnter() {
    this.cacheService.setClinicParam('type', 'introduce');


  }

  showScheduleView() {
    this.cacheService.set('expertList', '');
    this.navCtrl.push('ExpertListPage');
  }
  commonScheduleRealtime(type){
    this.cacheService.setClinicParam('expert',{});
    this.cacheService.setClinicParam('guahaoType',type);
    this.httpService.getScheduleListByDept(this.dept)
      .subscribe(json => {
        if (json.success) {
          this.cacheService.setClinicParam('dept',json.data);
          if(json.data.regScheduleVOList && json.data.regScheduleVOList.length > 0){
            this.navCtrl.push('SourceDetail');
          }else{
            this.widgetService.toast('暂无排班');
          }

          // this.navCtrl.push('ExpertSchedulePage');
        }
      })
  }
  selectExpert(expert) {
    this.cacheService.setClinicParam('expert', expert);
    this.navCtrl.push('ExpertInfoPage');
  }
  showMoreExpert(){
    this.showExperts = this.experts;
    this.showMore = false;
  }
}
