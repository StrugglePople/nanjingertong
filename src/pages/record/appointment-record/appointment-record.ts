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
 * Generated class for the AppointmentRecord page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-appointment-record',
  templateUrl: 'appointment-record.html',
})
export class AppointmentRecordPage extends BaseRecordPage {

  regType;
  constructor(public accountService: AccountService,public widgetService: WidgetService,
              public httpService:HttpService, public dateService: DateService, public navCtrl: NavController,
              public navParams: NavParams, public event:Events, public app: AppConfig, public nativePageTransitions: NativePageTransitions) {
    super(accountService, widgetService, dateService, navCtrl, navParams, app, nativePageTransitions);
    this.regType = this.navParams.data.regType;
    //接收appoint.delete通知然后删除数组中的对应数据
    this.event.subscribe('appoint.delete',(data)=> {
      for (let i = 0; i < this.dataList.length; i++) {

        if (data.zhpTradeId == this.dataList[i].zhpTradeId) {
          this.dataList.splice(i, 1);
          break;
        }
      }
    })
  }

  ionViewWillEnter(){
    if(this.dataList.length == 0){
      super.afterSelectMember();
    }
  }

  getServiceData(infiniteScroll?: any) {
    this.httpService.getAppointmentOrRegOnline(this.regType, this.member.aesId, this.yearMonthDay)
      .subscribe(json => {
        if (json.success) {
          this.yearMonthDay = json.data.dayName;
          this.dataList = this.dataList.concat(json.data.regRecords);
          // this.dataList = this.packageData2(json.data instanceof Array ? json.data : json.data.regRecords);
          this.hasMore = json.data && json.data.regRecords && json.data.regRecords.length > 0;
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
