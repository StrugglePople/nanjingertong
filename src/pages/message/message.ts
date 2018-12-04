import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {AccountService} from "../../providers/account.service";
import {AppConfig} from "../../app/app.config";
import {DomSanitizer} from "@angular/platform-browser";
import {BasePage} from "../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the Message page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
  providers: [AccountService]
})
export class MessagePage extends BasePage{
  messageUrl;
  accountIdStr;
  messageNum = 0;
  backEventName = 'GoBack';
  constructor(public accountService: AccountService,  private platform: Platform, public navCtrl: NavController,
              public app: AppConfig, public sanitizer: DomSanitizer, public navParams: NavParams, public event: Events,
              public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
  }
  GoBack(){
    window.frames[0].postMessage({physicalBack: true}, '*');
  }
  //iframe中通信
  showMessageDetail(param) {
    if (typeof param === 'string') {
      param = eval('(' + param + ')');
    }
    if (param.patientId) {
      this.accountService.setSelectMember(param.patientId - 0);
    }
    if (param.bussinessType == 'PACS') {
      this.navCtrl.push('CheckRecordPage');
    } else if (param.bussinessType == 'ASSAY') {
      this.navCtrl.push('InspectRecordPage');
    } else if (param.bussinessType == 'DRUG') {
      this.navCtrl.push('FeeRecordPage');
    } else if (param.bussinessType == 'RESERVATION') {
      this.navCtrl.push('AppointmentRecordPage');
    } else if (param.bussinessType == 'GUAHAO') {
      this.navCtrl.push('RegRecordPage');
    }else if (param.bussinessType == 'YUYUE') {
      this.navCtrl.push('AppointmentRecordPage');
    } else if (param.type == 'IndexBack') {
      this.navCtrl.pop();
      // window.parent.history.go(-1);
    } else if (param.type == 'num') {
      this.messageNum = param.num;
      this.event.publish('message.num', this.messageNum);
    }
  }

  ionViewDidLoad() {
    if (this.app.windowListener.message == 0) {
      this.app.windowListener.message = 1;
      window.addEventListener('message',(e)=> {
        this.showMessageDetail(e.data);
      }, false);
    }
  }

  //从服务中加载页面iframe
  ionViewDidEnter() {
    if (this.accountService.isLogin()) {
      if (this.messageUrl && (this.accountIdStr && this.accountIdStr == this.app.session.id)) return;
      this.accountIdStr = this.app.session.id;
      let system = this.platform.is('ios') ? 'ios' : 'android';
      let url = this.app.url.notify + '/resources/www/index.html?mode=' + this.app.mode + '&accountIdStr=' + this.app.session.id +
        '&isTab=false&companyId=' + this.app.hospitalId + '&head=true&headColor=4A9EFB&platform='+system+'&serviceId=80001&time='+Math.random()+'#/message-index-view';
      this.messageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

  login() {
    this.navCtrl.push('LoginPage');
  }
}
