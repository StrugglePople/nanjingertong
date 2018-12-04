import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpService} from "../../../../providers/http.service";
import {CacheService} from "../../../../providers/cache.service";
import {AppConfig} from "../../../../app/app.config";
import {BasePage} from "../../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the ExpertCommonListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-expert-common-list',
  templateUrl: 'expert-common-list.html',
})
export class ExpertCommonListPage extends BasePage{

  experts = [];

  dept;
  constructor(public httpService: HttpService, public navCtrl: NavController, public navParams: NavParams,
              public cacheService: CacheService, public app: AppConfig, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.dept = this.cacheService.getClinicParam('dept');
  }

  ionViewDidLoad() {
    this.httpService.getStaticExpertsByDept(this.dept)
      .subscribe(json=> {
        if (json.success) {
          this.experts = json.data;
          for (let expert of this.experts) {
            if(expert.picNam && expert.picName.indexOf('http') > -1){
              expert.src = expert.picName + '?' + new Date().getTime();
            }else{
              expert.src = this.app.url.mobile + '/mobile/image/hospital/' + this.app.hospitalId + '/expert/' + expert.picName + '?' + new Date().getTime();
            }
          }
        }
      });
  }

  clickExpert(expert) {
    this.cacheService.clearClinicParam();
    this.cacheService.setClinicParam('type', 'clinic');
    this.cacheService.setClinicParam('expert', expert);
    this.cacheService.setClinicParam('dept', this.dept);
    this.navCtrl.push('ExpertInfoPage');
    /*this.httpService.getScheduleListByExpert(this.dept,expert)
      .subscribe(json => {
        if (json.success) {
          expert.regScheduleVOList = json.data.regScheduleVOList;
          this.cacheService.setClinicParam('expert', expert);
          this.navCtrl.push('SourceDetail');
          // this.navCtrl.push('ExpertSchedulePage');
        }
      })*/
  };


}
