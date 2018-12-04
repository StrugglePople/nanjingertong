import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BaseRecordPage} from "../baseRecord";
import {AccountService} from "../../../providers/account.service";
import {WidgetService} from "../../../providers/widget.service";
import {HttpService} from "../../../providers/http.service";
import {DateService} from "../../../providers/date.service";
import {AppConfig} from "../../../app/app.config";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {InAppBrowser} from "@ionic-native/in-app-browser";

/**
 * Generated class for the InspectRecordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-inspect-record',
  templateUrl: 'inspect-record.html',
  providers: [AccountService]
})
export class InspectRecordPage extends BaseRecordPage {

  selectIndex = "0";
  constructor(public accountService: AccountService,public widgetService: WidgetService,
              public httpService:HttpService, public dateService: DateService, public navCtrl: NavController,
              public navParams: NavParams, public app: AppConfig, public nativePageTransitions: NativePageTransitions,private iab: InAppBrowser) {
    super(accountService, widgetService, dateService, navCtrl, navParams, app, nativePageTransitions);
  }

  ionViewWillEnter(){
    if(this.dataList.length == 0){
      super.afterSelectMember();
    }
  };
  segmentChanged(value){
    this.dataList = [];
    super.afterSelectMember();
  };

  getServiceData(infiniteScroll?: any,refresh?) {
    if(refresh){
      this.yearMonth = '';
      this.dataList = [];
    }
    this.httpService.getCheckInspect(this.member.aesId, this.yearMonth,this.selectIndex=="0"?"GENERATE_ASSAY_REPORT":"MICRO_ASSAY_REPORT")
      .subscribe(json => {
        if (json.success) {
          this.yearMonth = json.data[0].monthName;
          this.dataList = this.dataList.concat(json.data);
          this.hasMore = json.data && json.data.length > 0;
        } else {
          if (json.data == -1) {
            this.widgetService.confirm(json.errMsg, ()=> {
              this.navCtrl.push('MemberInfoPage', {member: this.accountService.getSelectMember()});
            })
          }
          this.hasMore = false;
        }
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      })
  }
  getInspectDetailById(item1){
    if(item1.type == -1){
      this.widgetService.confirm("浏览器中查看微生物详情", () => {
        let browser = this.iab.create(this.app.url.mobile + "/mobile/reports/assayMicro/detail/"+item1.id, '_system');
        browser.show();
      }, '打开文件', '确定');
      return;
    }
    this.httpService.getInspectDetailById(item1.id)
      .subscribe(json => {
        if (json.success) {
          item1.readType = 1;
          this.navCtrl.push('InspectRecordDetailPage',json.data);
        }

      })

  }
}
