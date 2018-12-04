import {Component, Inject} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AppConfig} from "../../../app/app.config";
import {HttpService} from "../../../providers/http.service";
import {WidgetService} from "../../../providers/widget.service";
import {ValidateService} from "../../../providers/validate.service";
import {CacheService} from "../../../providers/cache.service";
import {BasePage} from "../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the ResetAccount page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reset-account',
  templateUrl: 'reset-account.html',
})
export class ResetAccountPage extends BasePage{

  code?: string;

  mobile?: string;

  password?: string;

  securityCode?: string;

  constructor(public app: AppConfig, public httpService: HttpService, public widgetService: WidgetService,
              public validateService: ValidateService, @Inject('DataService') public dataService,
              public cacheService: CacheService, public navCtrl: NavController, public navParams: NavParams,
              public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.code = this.app.session.mobile;
  }
  resetAccount() {
    if(!this.password) {
      this.widgetService.toast('请输入当前账号密码');
      return;
    }
    if(!this.mobile) {
      this.widgetService.toast(this.dataService.msg.need_mobile);
      return;
    }
    if(!this.validateService.isMobile(this.mobile)) {
      this.widgetService.toast(this.dataService.msg.error_mobile);
      return;
    }
    if(!this.securityCode) {
      this.widgetService.toast(this.dataService.msg.need_scode);
      return;
    }
    let password = this.httpService.encryptByDES(this.password,this.mobile + this.app.FIX_FACTOR + this.securityCode);
    let securityCode = this.httpService.encryptByDES(this.securityCode,this.mobile + this.app.FIX_FACTOR);
    this.httpService.resetAccount(password, this.mobile, securityCode)
      .subscribe(json => {
        if (json.success) {
          this.app.session.mobile = this.mobile;
          this.cacheService.set('cache.account', {mobile: this.mobile});
          this.cacheService.set('app.session', {
            id: this.app.session.id,
            mobile: this.mobile
          });
          this.widgetService.toast('重置账号成功!', () => {
            this.navCtrl.pop();
          })
        }
      });
  }
}
