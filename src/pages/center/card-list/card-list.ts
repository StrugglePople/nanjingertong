import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BasePage} from "../../../app/base";
import {AppConfig} from "../../../app/app.config";
import {AccountService} from "../../../providers/account.service";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {WidgetService} from "../../../providers/widget.service";

/**
 * Generated class for the CardListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-card-list',
  templateUrl: 'card-list.html',
})
export class CardListPage extends BasePage {

  members:any;
  cardType:any;
  session:any;
  noCard:any;
  constructor(public app: AppConfig, public navCtrl: NavController, public navParams: NavParams,
              public accountService: AccountService, public widgetService: WidgetService) {
    super(navCtrl, navParams);
    this.cardType = this.navParams.data.cardType;
    this.noCard = this.navParams.data.noCard;
    this.session = this.app.session;
    this.initMemberCards();
  }

  ionViewDidLoad() {
  }

  initMemberCards() {
    if (this.app.hospitalConfig.noCard && this.noCard) {
      let members = [];
      for (let i = 0; i < this.app.session.accounts.length; i++) {
        let member = {...this.app.session.accounts[i]};
        if (!member.cards || member.cards.length == 0) {
          member.cards = [{
            hospitalId: this.app.hospitalId,
            medicalCardNo: member.paperNo,
            medicalCardType: "身份证",
            name: member.name,
            patientId: member.id,
            aesId: member.aesId,
            mobileNo:member.mobileNo
          }];
        }
        members.push(member)
      }
      this.members = members;
    } else {
      this.members = this.app.session.accounts;
    }
  }

  chooseCard(card) {
    if(card.GHType == '挂号'){
      this.widgetService.alert('当天挂号不支持无卡，请先绑定就诊卡后再挂号！');
      return;
    }
    this.accountService.setSelectCard(card);
    this.accountService.setSelectMember(card.patientId);
    this.navCtrl.pop();
  }
}
