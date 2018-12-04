import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {AppConfig} from "../../../app/app.config";
import {AccountService} from "../../../providers/account.service";
import {WidgetService} from "../../../providers/widget.service";

/**
 * Generated class for the MemberSelectModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-member-select-modal',
  templateUrl: 'member-select-modal.html',
  providers: [AccountService]
})
export class MemberSelectModalPage {
  type;
  members = [];
  constructor(public app:AppConfig, public accountService: AccountService, public viewCtrl: ViewController,
              params: NavParams,public navCtrl: NavController, public widgetService?: WidgetService) {
    // this.type = params.get("type");
    let members = this.app.session.accounts || [];
    /*let tpMembers = [];
    for (let member of members) {
      if (member.cards.length > 0) {
        tpMembers.push(member);
      }
    }*/
    this.members = members;

  }

  //选人
  chooseMember(id) {
    this.accountService.setSelectMember(id);
    this.navCtrl.pop();

  }

  showMemberInfo() {
    let members =this.app.session.accounts;
    if(members.length >= 5){
      this.widgetService.toast('每个账号下最多绑定5位持卡人，请先删除!');
      return
    }
    this.navCtrl.push('MemberInfoPage', {member: {}})
  }
}
