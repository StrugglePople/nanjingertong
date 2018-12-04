import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AppConfig} from "../../../app/app.config";
import * as JsBarcode from "jsbarcode";
import {HttpService} from "../../../providers/http.service";
import {WidgetService} from "../../../providers/widget.service";
import {AccountService} from "../../../providers/account.service";
import { QRCode} from "qrcode-generator-ts";
import {BasePage} from "../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
/**
 * Generated class for the CardInfo page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-card-info',
  templateUrl: 'card-info.html',
})
export class CardInfoPage extends BasePage {

  card;

  type;

  member;

  hospitalName;

  qrSrc;

  constructor(public app: AppConfig, public httpService: HttpService, public widgetService: WidgetService,
              public accountService: AccountService, public navCtrl: NavController, public navParams: NavParams,
              public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.card = this.navParams.data.card;
    this.type = this.navParams.data.type;
    this.member = this.navParams.data.member;
    this.hospitalName = this.app.hospitalName;
  }


  ionViewDidEnter() {
    // let qr = new QRCode();
    // qr.setTypeNumber(5);
    // qr.addData(this.card.medicalCardNo);
    // qr.make();
    // this.qrSrc = qr.toDataURL();
    // let canvas2 = document.getElementById('canvas2');
    // JsBarcode(canvas2, this.card.medicalCardNo);
  }

  deleteCard(type) {
    let string = type == 'jiuZhen' ? '就诊卡号' : '住院号';
    this.widgetService.confirm('确认删除' + string + '？', () => {
      this.httpService.deleteCard(this.card.aesId)
        .subscribe(json => {
          if (json.success) {
            if (type == 'jiuZhen') {
              this.accountService.deleteCard(this.card.id);
              this.accountService.setCardsToAccount();
            } else {
              this.accountService.deleteZhuyuan(this.card.id);
              this.accountService.setZhuYuanToAccount();
            }
            this.widgetService.toast("删除" + string + '成功', () => {
              this.navCtrl.pop();
            });
          }
        })
    });
  }
}
