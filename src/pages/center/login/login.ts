import {Component, Inject, ViewChild} from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams, Platform, TextInput} from 'ionic-angular';
import {BasePage} from "../../../app/base";
import {HttpService} from "../../../providers/http.service";
import {WidgetService} from "../../../providers/widget.service";
import {ValidateService} from "../../../providers/validate.service";
import {CacheService} from "../../../providers/cache.service";
import {AppConfig} from "../../../app/app.config";
import {AccountService} from "../../../providers/account.service";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
declare let ZkPlugin:any;
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AccountService]
})
export class LoginPage extends BasePage {

  mobile: string;

  password: string;

  isCheck: boolean = false;

  pType = 'password';

  @ViewChild('pi') pi: TextInput;

  constructor(public httpService: HttpService, public widgetService: WidgetService, public validateService: ValidateService,
              @Inject('DataService') public dataService, public cacheService: CacheService, public navCtrl: NavController,private loadingCtrl: LoadingController,
              public app: AppConfig, public accountService: AccountService, public navParams: NavParams, public nativePageTransitions: NativePageTransitions,private platform: Platform) {
    super(navCtrl, navParams, nativePageTransitions);
  }

  ionViewWillEnter() {
    this.mobile = this.cacheService.get('cache.account') ? this.cacheService.get('cache.account').mobile : ''
  }

  notify() {
    let type = this.isCheck ? 'text' : 'password';
    this.pType = type;
  }

  login() {
    /*let loader: Loading = this.loadingCtrl.create({
      dismissOnPageChange:true
    });
    loader.present();*/
    if (!this.mobile) {
      this.widgetService.toast(this.dataService.msg.need_mobile);
      return;
    }
    if (!this.validateService.isMobile(this.mobile)) {
      this.widgetService.toast(this.dataService.msg.error_mobile);
      return;
    }
    if(!this.password) {
      this.widgetService.toast(this.dataService.msg.need_pwd);
      return;
    }
    this.httpService.getVersion(true,true)
      .subscribe(data => {
        /*loader.dismiss()
          .then(()=> {
            if (data.isCatch || !data.isMust) {
              this.realLogin();
            }
          })*/
        if (data.isCatch || !data.isMust) {
          this.realLogin();
        }
      })
  }
  realLogin() {
    let password = this.httpService.encryptByDES(this.password,this.mobile + this.app.FIX_FACTOR);
    this.httpService.login(this.mobile, password,true)
      .subscribe(json => {
        if (json.success) {
          if (json.data.code != this.mobile) {
            this.widgetService.toast('信息有误, 请联系客服');
            return;
          }
          this.cacheService.set('cache.account', {mobile: json.data.code});
          this.cacheService.set('app.session', {
            id: json.data.id,
            mobile: json.data.code
          });
          this.app.session = json.data;
          this.app.session.mobile = json.data.code;
          this.app.session.accounts = json.data.accounts || [];
          this.accountService.getCards(true, () => {
            this.widgetService.toast(this.dataService.msg.login_success, () => {
              this.navCtrl.pop();
            }, 2000);
          });
          this.accountService.getBaiduPushParam((param)=>{
            this.httpService.bindPush(param).subscribe((json)=>{
            });
          });
        } else {
          this.cacheService.removeKey('cache.account');
        }
      });
  }
}
