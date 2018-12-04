import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
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
  selector: 'page-visit-expert',
  templateUrl: 'visit-expert.html'
})
export class VisitExpert {


  visitList:any;
  visitDept:any;
  constructor(public app: AppConfig, public widgetService: WidgetService, public cacheService: CacheService,
              public accountService: AccountService, public httpService: HttpService, public navCtrl: NavController,
              public navParams: NavParams) {
    this.visitDept = this.cacheService.getClinicParam('dept');
    let arr = this.navParams.data,
        arrs = [],
        weeks ={
          'DAY_1':'周一',
          'DAY_2':'周二',
          'DAY_3':'周三',
          'DAY_4':'周四',
          'DAY_5':'周五',
          'DAY_6':'周六',
          'DAY_7':'周日',


        };
    for(let i in arr){
      arrs.push({
        week:weeks[i],
        visit:arr[i]
      });
    }
    this.visitList = arrs;

  }

  ionViewDidLoad() {
  }
  showVisitInfoView(expertId){
    // this.httpService.
    this.httpService.getScheduleListByExpert(this.visitDept, expertId)
      .subscribe(json => {
        if (json.success) {
          this.cacheService.setClinicParam('type', 'clinic');
          this.cacheService.setClinicParam('expert', json.data);
          this.navCtrl.push('ExpertInfoPage');
        }
      })

  }
  showDeptInfo(deptId){
    this.navCtrl.push('DeptInfoPage');
  }
}
