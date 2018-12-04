import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AppConfig} from "../../../app/app.config";
import {CacheService} from "../../../providers/cache.service";
import {BasePage} from "../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {WidgetService} from "../../../providers/widget.service";

/**
 * Generated class for the MemberList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-member-list',
  templateUrl: 'member-list.html',
})
export class MemberListPage extends BasePage {
  items?: any[];
  defaultId?: number;
  constructor(public app: AppConfig, public cacheService: CacheService, public navCtrl: NavController,
              public navParams: NavParams, public nativePageTransitions: NativePageTransitions, public widgetService?: WidgetService) {
    super(navCtrl, navParams, nativePageTransitions);
  }

  ionViewWillEnter() {
    this.items = this.app.session.accounts;
    this.defaultId = this.cacheService.get('member.default')
  }
  showMemberInfo() {
    /*if(this.items.length >= 5){
      this.widgetService.toast('每个账号下最多绑定5位持卡人，请先删除!');
      return
    }*/
    this.navCtrl.push('MemberInfoPage', {member: {}})
  }

  clickItem(item) {
    this.navCtrl.push('MemberInfoPage', {member: item})
  }
}
