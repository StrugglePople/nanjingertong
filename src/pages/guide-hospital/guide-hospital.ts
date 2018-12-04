import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BasePage} from "../../app/base";
import {HttpService} from "../../providers/http.service";
import {CacheService} from "../../providers/cache.service";
import {AccountService} from "../../providers/account.service";
import {WidgetService} from "../../providers/widget.service";
import {AppConfig} from "../../app/app.config";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";


/**
 * Generated class for the GuideHospital page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-guide-hospital',
  templateUrl: 'guide-hospital.html',
})
export class GuideHospitalPage extends BasePage {

  depts:any[] = [];
  experts:any[] = [];
  newsList:any[] = [];
  HosNewsList:any[] = [];
  imgUrlPrefix:any = "assets/image/guide-hospital/banner.png";
  doctorDefail = "assets/image/common/doctor.png";
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpService,
              public cacheService: CacheService, public accountService: AccountService, public widgetService: WidgetService,
              public app: AppConfig, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    // this.showDeptList('dept',false,true);
    // this.showExpertList('expert');
    this.loadKinds();
    this.hospitalNews();

  }
  ionViewWillEnter(){
    if(this.depts.length ==0){
      this.showDeptList('dept',false,true);
    }
    if(this.newsList.length == 0){
      this.loadKinds();
    }
    if(this.HosNewsList.length == 0){
      this.hospitalNews();
    }
  }

  showDeptList(type,turn?,canyuyue?) {
    this.cacheService.clearClinicParam();
    this.httpService.getAllDepts(canyuyue)
      .subscribe(json => {
        if(json.success){
          this.cacheService.set('deptList', json.data);
          this.cacheService.setClinicParam('type', 'introduce');
          this.cacheService.setClinicParam('sub.type', type);
          if(json.data.length >4){
            json.data = json.data.slice(0,4);
          }
          this.depts = json.data;
          if(turn){
            this.navCtrl.push('DeptInfoListPage',{showYuyue:canyuyue});
            /* if(type == 'dept'){
               this.navCtrl.push('DeptInfoListPage');
             }else{
               this.navCtrl.push('DeptListPage');
             }*/

          }
        }

      })
  }
  showExpertList(type,turn?) {
    this.httpService.getAllExperts()
      .subscribe(json => {
        if(json.data.length >8){
          json.data = json.data.slice(0,8);
        }
        if(turn){
          this.navCtrl.push('DeptInfoListPage');
        }
        this.experts = json.data;

      })
  }
  clickDept(dept) {
    this.cacheService.setClinicParam('dept', dept);
    this.cacheService.set('expertList', '');
    this.navCtrl.push('DeptInfoPage',{showYuyue:true});
  }
  clickExpert(expert) {
    this.cacheService.clearClinicParam();
    this.cacheService.setClinicParam('type', 'clinic');
    this.cacheService.setClinicParam('expert', expert);
    this.cacheService.setClinicParam('dept', expert.underDepts?expert.underDepts[0].id:'');
    this.navCtrl.push('ExpertInfoPage');
  };
  loadKinds() {
    this.httpService.loadCatalogKindByType('ANNOUNCEMENT',true)
      .subscribe(json => {
        if (json.success) {
          this.httpService.loadCatalogList({catalog:json.resultData.id,pageNum:1,pageSize: 3},true)
            .subscribe(json => {
              if (json.success) {
                let dataItems = json.resultData ? json.resultData.pageData : [];
                this.newsList = dataItems;
              }
            });

        }
      });
  }
  hospitalNews() {
    /*this.httpService.loadHospitalNews()
      .subscribe(json => {
        if (json.success) {
          this.httpService.loadHospitalNewsList({catalogId:json.data.catalogList[0].id,pageNumber:1,pageSize: 5})
            .subscribe(json => {
              if (json.success) {
                let dataItems = json.data.pageData ? json.data.pageData : [];
                this.HosNewsList = dataItems;

              }
            });
        }
      })*/
    this.httpService.loadCatalogKindByType('HEALTH',true)   /*ANNOUNCEMENT*/
      .subscribe(json => {
        if (json.success) {
          this.httpService.loadCatalogList({catalog:json.resultData.id,pageNum:1,pageSize: 3},true)
            .subscribe(json => {
              if (json.success) {
                let dataItems = json.resultData ? json.resultData.pageData : [];
                this.HosNewsList = dataItems;
              }
            });
        }
      });
  }




  showPregnantHealthView() {
    if (!this.accountService.isLogin()) {
      this.navCtrl.push('LoginPage');
      return;
    }
    this.navCtrl.push('PregnantSetDatePage');
  }

}
