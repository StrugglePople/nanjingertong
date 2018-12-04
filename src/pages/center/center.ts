import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {AccountService} from "../../providers/account.service";
import {AppConfig} from "../../app/app.config";
import {BasePage} from "../../app/base";
import {WidgetService} from "../../providers/widget.service";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {HttpService} from "../../providers/http.service";
import {CacheService} from "../../providers/cache.service";

/**
 * Generated class for the Center page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-center',
  templateUrl: 'center.html',
  providers: [AccountService]
})
export class CenterPage extends BasePage {

  isLogin: boolean;

  code: string = '';
  unReadNumber: any = 0;
  topModule:any[] = [];

  headIcon: string = 'assets/image/center/center-account-pic.png';

  constructor(public httpService: HttpService,public accountService: AccountService, public app: AppConfig, public widgetService: WidgetService,
              public navCtrl: NavController, public navParams: NavParams, public cacheService: CacheService,
              public nativePageTransitions: NativePageTransitions,private platform: Platform) {
    super(navCtrl, navParams, nativePageTransitions, app, widgetService);
    for(let i=1;i<=3;i++){
      this.topModule.push("assets/image/center/top-"+ i +".png")
    }
  }

  ionViewWillEnter() {
    this.getNoredMessage();
    let isLogin = this.accountService.isLogin();
    if (!isLogin) {
      if(this.navCtrl.last().id == "LoginPage"){
        this.navCtrl.parent.select(0);
      }else{
        this.navCtrl.push('LoginPage');
      }

      return;
    }
    this.isLogin = this.accountService.isLogin();
    if (this.isLogin) {
      this.code = this.app.session.mobile;
    }
  }

  logout() {
    this.widgetService.confirm('确认退出账号吗？', () => {
      //退出百度云推送账号
      this.accountService.getBaiduPushParam((param)=>{
        this.httpService.unBindPush(param).subscribe((json)=>{
        });
      });
      this.accountService.logout();
      this.isLogin = this.accountService.isLogin();
      this.code = '';
      this.navCtrl.parent.select(0);
      // this.headIcon = 'assets/image/center/no-icon.png';
    });
  }
  getNoredMessage(){
    this.httpService.getMessagesNum({accountIdStr:this.app.session.id})
      .subscribe(json => {
        if (json.success) {
          let unreadNum = json.data.unreadAmountTypes[1].unreadAmount;
          if(unreadNum>99){
            unreadNum = '99+';
          }
          this.unReadNumber = unreadNum;
        }
      })
  }
}
