import {Component, Inject} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AppConfig} from "../../../app/app.config";
import {HttpService} from "../../../providers/http.service";
import {WidgetService} from "../../../providers/widget.service";
import {ValidateService} from "../../../providers/validate.service";
import {BasePage} from "../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the ResetPassword page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage extends BasePage{

  oldPassword?: string;

  newPassword?: string;

  confirmPassword?: string;

  code: string;

  constructor(public app: AppConfig, public httpService: HttpService, public widgetService: WidgetService,
              public validateService: ValidateService, @Inject('DataService') public dataService,
              public navCtrl: NavController, public navParams: NavParams, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.code = this.app.session.mobile;
  }

  resetPassword() {
    if(!this.oldPassword) {
      this.widgetService.toast('请输入当前账号密码');
      return;
    }
    if(!this.newPassword) {
      this.widgetService.toast(this.dataService.msg.no_new_pwd);
      return;
    }
    if(!this.validateService.isNumEn(this.newPassword)){
      this.widgetService.toast(this.dataService.msg.error_pwd);
      return;
    }
    if(!this.confirmPassword) {
      this.widgetService.toast(this.dataService.msg.no_re_pwd);
      return;
    }
    if(this.confirmPassword !== this.newPassword) {
      this.widgetService.toast(this.dataService.msg.pwd_not_equal_re_pwd);
      return;
    }
    let oldPassword = this.httpService.encryptByDES(this.oldPassword,this.app.FIX_FACTOR);
    let newPassword = this.httpService.encryptByDES(this.newPassword,this.app.FIX_FACTOR);
    this.httpService.resetPassword(oldPassword, newPassword, newPassword)
      .subscribe(json => {
        if (json.success) {
          this.widgetService.toast('密码修改成功!', () => {
            this.navCtrl.pop();
          });
        }
      });
  }
}
