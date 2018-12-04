import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BaseRecordPage} from "../baseRecord";
import {AccountService} from "../../../providers/account.service";
import {WidgetService} from "../../../providers/widget.service";
import {HttpService} from "../../../providers/http.service";
import {DateService} from "../../../providers/date.service";
import {AppConfig} from "../../../app/app.config";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the CheckRecordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-check-record',
  templateUrl: 'check-record.html',
  providers: [AccountService]
})
export class CheckRecordPage extends BaseRecordPage {

  constructor(public accountService: AccountService,public widgetService: WidgetService,
              public httpService:HttpService, public dateService: DateService, public navCtrl: NavController,
              public navParams: NavParams, public app: AppConfig, public nativePageTransitions: NativePageTransitions) {
    super(accountService, widgetService, dateService, navCtrl, navParams, app, nativePageTransitions);
  }

  /*ionViewDidLoad() {
  }*/
  ionViewWillEnter(){
    if(this.dataList.length == 0){
      super.afterSelectMember();
    }

  }
  getServiceData(infiniteScroll?: any,refresh?) {
    if(refresh){
      this.yearMonth = '';
      this.dataList = [];
    }
    this.httpService.getCheckup(this.member.aesId, this.yearMonth)
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
  getCheckDetailById(item1){
    this.httpService.getCheckDetailById(item1.id)
      .subscribe(json => {
        if (json.success) {
          item1.readType = 1;
          this.navCtrl.push('CheckRecordDetailPage',json.data);
        }

      })

  }
}
