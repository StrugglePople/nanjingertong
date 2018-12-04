import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Select} from 'ionic-angular';
import {CacheService} from "../../../../providers/cache.service";
import {HttpService} from "../../../../providers/http.service";
import {AccountService} from "../../../../providers/account.service";
import {WidgetService} from "../../../../providers/widget.service";
import {BasePage} from "../../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {AppConfig} from "../../../../app/app.config";

/**
 * Generated class for the ExpertInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-expert-info',
  templateUrl: 'expert-info.html',
})
export class ExpertInfoPage extends BasePage{

  @ViewChild('sel') sel: Select;

  attentionId = 0;

  // attentionNum = 0;
  sb = true;

  ib = true;

  depts = [];

  dept;

  expert;
  doctorDefail = "";
  constructor(public app: AppConfig,public cacheService: CacheService,public navCtrl: NavController, public navParams: NavParams,
              public httpService: HttpService,  public accountService: AccountService, public widgetService: WidgetService,
              public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.doctorDefail = this.app.url.mobile + "/mobile/image/hospital/10035/expert/";
    this.expert = this.cacheService.getClinicParam('expert');
    this.dept = this.cacheService.getClinicParam('dept');
  }

  ionViewWillEnter() {
    this.cacheService.setClinicParam('type', 'introduce');
    /*this.httpService.getScheduleListByExpert(this.dept, this.expert)
      .subscribe(json => {
        if (json.success) {
          this.expert.regScheduleVOList = json.data.regScheduleVOList;
          this.cacheService.setClinicParam('expert', this.expert);
          this.navCtrl.push('SourceDetail');
          // this.navCtrl.push('ExpertSchedulePage');
        }
      })*/
    /*this.httpService.testAttention(this.expert.id)
      .subscribe(json => {
        if (json.success) {
          this.attentionId = json.data.favoritesId;
        }
      });*/
  }
  scheduleRealtime(type){
    this.cacheService.setClinicParam('guahaoType',type);
    this.httpService.getScheduleListByExpert(this.dept, this.expert.id)
      .subscribe(json => {
        if (json.success) {
          this.expert.regScheduleVOList = json.data.regScheduleVOList;
          this.cacheService.setClinicParam('expert', this.expert);
          if(json.data.regScheduleVOList && json.data.regScheduleVOList.length > 0){
            this.navCtrl.push('SourceDetail');
          }else{
            this.widgetService.toast('暂无排班');
          }

        }
      })
  }

  //关注
  attention() {
    if (!this.accountService.isLogin()) {
      this.navCtrl.push('LoginPage');
      return;
    }
    if (this.attentionId > 0) {
      this.httpService.cancelAttention(this.attentionId)
        .subscribe(json => {
          if (json.success) {
            this.attentionId = 0;
          }
        })
    } else {
      this.httpService.addAttention(this.expert.id, 'EXPERT')
        .subscribe(json => {
          if (json.success) {
            this.attentionId = json.data;
          }
        })
    }
  }

  showSelect() {
    this.httpService.getDeptsByExpert(this.expert.id)
      .subscribe(json => {
        if (json.success) {
          if (json.data && json.data.length > 1) {
            this.depts = json.data;
            setTimeout(()=>{
              this.sel.open();
            }, 100);
          } else if (json.data && json.data.length == 1) {
            this.showScheduleView(json.data[0]);
          } else {
            this.widgetService.toast('没有排班')
          }
        }
      })
  }

  select(item) {
    this.showScheduleView(item);
  }
  showScheduleView(item) {
    this.cacheService.clearClinicParam();
    this.cacheService.setClinicParam('type', 'clinic');
    this.cacheService.setClinicParam('dept', item);
    this.cacheService.setClinicParam('expert', this.expert);
    this.cacheService.set('expertList', '');
    this.httpService.getScheduleListByExpert(item, this.expert.id)
      .subscribe(json => {
        if (json.success) {
          this.cacheService.setClinicParam('expert', json.data);
          this.navCtrl.push('ExpertSchedulePage');
        }
      })
  };
}
