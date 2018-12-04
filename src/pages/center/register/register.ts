import {Component, Inject} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AppConfig} from "../../../app/app.config";
import {Device} from "@ionic-native/device"
import {BasePage} from "../../../app/base";
import {WidgetService} from "../../../providers/widget.service";
import {ValidateService} from "../../../providers/validate.service";
import {HttpService} from "../../../providers/http.service";
import {CacheService} from "../../../providers/cache.service";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [Device]
})
export class RegisterPage extends BasePage {

  mobile?: string;

  picVCode?: string;

  securityCode?: string;

  password?: string;

  rePassword?: string;

  imgUrl;

  protocolCheck:boolean;

  constructor(public device: Device, public app: AppConfig, public navCtrl: NavController, public navParams: NavParams,
              public widgetService: WidgetService, public validateService: ValidateService,public httpService: HttpService,
              @Inject('DataService') public dataService, public cacheService: CacheService, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.refreshImg();
  }

  refreshImg() {
    this.imgUrl = this.app.url.mobile +　'/mobile/image/verify/' + (this.device.uuid ? this.device.uuid : 'xxx') +'?time=' + new Date().getTime()
  }

  register() {
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
    if (!this.protocolCheck) {
      this.widgetService.toast(this.dataService.msg.no_read_register_protocol);
      return;
    }
    let password = this.httpService.encryptByDES(this.password,this.mobile + this.app.FIX_FACTOR + this.securityCode);
    let securityCode = this.httpService.encryptByDES(this.securityCode,this.mobile + this.app.FIX_FACTOR);
    this.httpService.register(this.mobile, password, password, securityCode)
      .subscribe(json => {
        if (json.success) {
          json.data.mobile = json.data.code;
          this.app.session = json.data;
          this.app.session.accounts = [];
          this.app.session.cards = [];

          this.cacheService.set('app.session', {
            id: json.data.id,
            mobile: json.data.mobile
          });//前端缓存

          this.widgetService.alert('请去"个人中心"添加"持卡人"信息！', ()=> {
            this.navCtrl.popToRoot();
          },'注册成功',null,true);
        }
      })
  }

}
