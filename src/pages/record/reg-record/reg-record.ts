import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BaseRecordPage} from "../baseRecord";
import {AccountService} from "../../../providers/account.service";
import {WidgetService} from "../../../providers/widget.service";
import {HttpService} from "../../../providers/http.service";
import {DateService} from "../../../providers/date.service";
import {AppConfig} from "../../../app/app.config";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the RegRecordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reg-record',
  templateUrl: 'reg-record.html',
})
export class RegRecordPage extends BaseRecordPage {

  constructor(public accountService: AccountService,public widgetService: WidgetService,
              public httpService:HttpService, public dateService: DateService, public navCtrl: NavController,
              public navParams: NavParams, public event:Events, public app: AppConfig, public nativePageTransitions: NativePageTransitions) {
    super(accountService, widgetService, dateService, navCtrl, navParams, app, nativePageTransitions);
    this.event.subscribe('reg.delete',(data)=> {
      for (let i = 0; i < this.dataList.length; i++) {
        let flag = false;
        for (let j = 0; j < this.dataList[i].list.length; j++)  {
          if (data.zhpTradeId == this.dataList[i].list[j].zhpTradeId) {
            this.dataList[i].list.splice(j, 1);
            flag = true;
            break;
          }
        }
        if (flag) {
          if (this.dataList[i].list.length == 0) {
            this.dataList.splice(i, 1);
          }
        }
      }
    })
  }

  ionViewDidLoad() {
    super.ionViewDidLoad();
  }

  getServiceData(infiniteScroll?: any) {
    this.httpService.getAppointmentOrRegOnline(2, this.member.aesId, this.yearMonth)
      .subscribe(json => {
        if (json.success) {
          // this.dataList = this.packageData2(json.data instanceof Array ? json.data : json.data.regRecords);
          this.dataList.push(json.data);
          this.hasMore = json.data && json.data.regRecords && json.data.regRecords.length > 0;
          this.yearMonth = json.data.yearMonthDay;
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

}
