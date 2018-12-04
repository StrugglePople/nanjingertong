import {Component, Inject} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpService} from "../../../providers/http.service";
import {WidgetService} from "../../../providers/widget.service";
import {ValidateService} from "../../../providers/validate.service";
import {CacheService} from "../../../providers/cache.service";
import {AccountService} from "../../../providers/account.service";
import {BasePage} from "../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {AppConfig} from "../../../app/app.config";

/**
 * Generated class for the ForgetPassword page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage extends BasePage {

  mobile?: string;

  securityCode?: string;

  password?: string;

  rePassword?: string;

  constructor(public app: AppConfig,public httpService: HttpService, public widgetService: WidgetService, public validateService: ValidateService,
              @Inject('DataService') public dataService, public cacheService: CacheService,public navCtrl: NavController,
              public accountService: AccountService, public navParams: NavParams, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
  }


  forgetPassword() {
    if (!this.mobile) {
      this.widgetService.toast(this.dataService.msg.need_mobile);
      return;
    }
    if (!this.validateService.isMobile(this.mobile)) {
      this.widgetService.toast(this.dataService.msg.error_mobile);
      return;
    }
    if(!this.securityCode) {
      this.widgetService.toast(this.dataService.msg.need_scode);
      return;
    }
    if(!this.password) {
      this.widgetService.toast(this.dataService.msg.need_pwd);
      return;
    }
    if (!this.validateService.isNumEn(this.password)) {
      this.widgetService.toast(this.dataService.msg.error_pwd);
      return;
    }
    if(!this.rePassword) {
      this.widgetService.toast(this.dataService.msg.no_re_pwd);
      return;
    }
    if(this.rePassword !== this.password) {
      this.widgetService.toast(this.dataService.msg.pwd_not_equal_re_pwd);
      return;
    }
    let password = this.httpService.encryptByDES(this.password,this.mobile + this.app.FIX_FACTOR + this.securityCode);
    let securityCode = this.httpService.encryptByDES(this.securityCode,this.mobile + this.app.FIX_FACTOR);
    this.httpService.forgetPassword(this.mobile, password, securityCode)
      .subscribe(json => {
        if (json.success) {
          this.cacheService.removeKey('cache.password');
          this.accountService.logout();
          this.widgetService.alert('密码修改成功', () => {
            this.navCtrl.pop();
          },null,null,true);
        }
      });
  }
}
