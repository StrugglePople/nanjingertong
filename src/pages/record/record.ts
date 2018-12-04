import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BasePage} from "../../app/base";
import {AppConfig} from "../../app/app.config";
import {WidgetService} from "../../providers/widget.service";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {HttpService} from "../../providers/http.service";
import {CacheService} from "../../providers/cache.service";
import {CallNumber} from "@ionic-native/call-number";

/**
 * Generated class for the Record page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-record',
  templateUrl: 'record.html',
  providers: [CallNumber]
})
export class RecordPage extends BasePage {

  private imgSrcs?:any[] = [];

  constructor(public app: AppConfig, public navCtrl: NavController, public navParams: NavParams, widgetService: WidgetService,
              private callNumber: CallNumber,public httpService: HttpService, public cacheService: CacheService,public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions, app, widgetService);
    for(let i=1;i<7;i++){
      let src = "assets/image/record/index-"+i+".png";
      this.imgSrcs.push(src);
    }
  }
  searhVisit(){
    this.widgetService.confirm('暂且只支持广州路院区查询',()=>{
      this.httpService.getAllVisitDepts().subscribe(json => {
        if(json.success){
          this.cacheService.clearClinicParam();
          this.cacheService.set('deptList', json.data);
          this.cacheService.setClinicParam('type', 'visit');
          this.navCtrl.push('DeptInfoListPage');
        }

      })

    });
  }
  showPriceInfoView(){
    this.httpService.searcPriceItem()
      .subscribe(json => {
        if (json.success) {
          this.navCtrl.push('PriceInfo',json.resultData);

        }
      });
  }
  getTel() {
      this.httpService.getHtmlInfo('PHONE_NUMBER')
      .subscribe(json => {
        if (json.success) {
          this.navCtrl.push('CheckInspectRecord',{type:'PHONE_NUMBER', title: '联系医院',phone:json.data.content});
          /*this.widgetService.confirm(json.data.content, () => {
            this.callNumber.callNumber(json.data.content, true);
          }, '联系客服', '拨号');*/
        }
      })
  }
  showDeptList(type) {
    this.cacheService.clearClinicParam();
    this.httpService.getAllDepts()
      .subscribe(json => {
        this.cacheService.set('deptList', json.data);
        this.cacheService.setClinicParam('type', 'introduce');
        this.cacheService.setClinicParam('sub.type', type);
        if(type == 'expert'){
          this.httpService.getAllExperts()
            .subscribe(json => {
              // this.cacheService.set('allExpert', json.data);
              /*this.navCtrl.push('DeptInfoListPage',{
                expert:true,
                allExpert:json.data
              });*/
              this.navCtrl.push('ExpertIntroduceList',{
                allExpert:json.data
              });

            })

        }else{
          this.navCtrl.push('DeptInfoListPage');
        }

      })
  }
}
