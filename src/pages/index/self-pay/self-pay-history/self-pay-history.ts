import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AccountService} from "../../../../providers/account.service";
import {HttpService} from "../../../../providers/http.service";

/**
 * Generated class for the SelfPayHistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-self-pay-history',
  templateUrl: 'self-pay-history.html',
})
export class SelfPayHistoryPage {

  member;

  items = [];

  yearMonth = '';

  hasMore = false;

  constructor(public accountService: AccountService, public navCtrl: NavController, public navParams: NavParams,
              public httpService: HttpService) {
    this.member = this.accountService.getSelectMember();
  }

  ionViewDidLoad() {
    this.loadData();
  }
  afterSelectMember() {
    this.items = [];
    let member = this.accountService.getSelectMember();
    this.member = member;
    if (!member) return;
    this.loadData();
  }
  loadData() {
    if (!this.member) return;
    this.httpService.getBilledList(this.yearMonth, this.member.aesId)
      .subscribe(json => {
        if (json.success) {
          if (json.data && json.data.billList) {
            this.items.push(json.data);
            // this.yearMonth = json.data.yearMonth;
          }
        }
        this.hasMore = (json.data && json.data.billList) ? true : false;
      })
  }

  showDetail(item) {
    this.navCtrl.push('SelfPayDetailPage', {data: item});
  }

  backButtonClick() {
    //此处根据从哪个入口决定返回哪个页面
    let lastTwoPageName = (this.navCtrl.getViews()[this.navCtrl.getViews().length - 2])['name'];
    //直接挂号
    if (lastTwoPageName == 'PayResultPage') {
      this.navCtrl.popToRoot();
    } else {
      this.navCtrl.pop();
    }
  }
}
