import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BasePage} from "../../app/base";
import {HttpService} from "../../providers/http.service";
import {WidgetService} from "../../providers/widget.service";
import {AppConfig} from "../../app/app.config";
import { CallNumber } from '@ionic-native/call-number';
import {Device} from "@ionic-native/device";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
/**
 * Generated class for the More page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
  providers: [CallNumber]
})
export class MorePage extends BasePage {

  version = '';

  constructor(public httpService: HttpService, public widgetService: WidgetService, public navCtrl: NavController,
              public navParams: NavParams, public app: AppConfig, private callNumber: CallNumber, public device: Device,
              public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
  }

  /*getTel() {
    this.httpService.getHtmlInfo('ZHICALL_PHONE')
      .subscribe(json => {
        if (json.success) {
          /!*this.widgetService.confirm(json.data.content, () => {
            this.callNumber.callNumber(json.data.content, true);
          }, '联系客服', '拨号');*!/
          this.callNumber.callNumber(json.data.content, true);
        }
      })
  }*/
  getTel() {
    this.httpService.getHtmlInfo('PHONE_NUMBER')
      .subscribe(json => {
        if (json.success) {
          this.navCtrl.push('CheckInspectRecord',{type:'PHONE_NUMBER', title: '联系医院',phone:json.data.content});
        }
      })
  }
}
