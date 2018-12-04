import { Component,ViewChild } from '@angular/core';
import {Platform, Nav, ToastController, IonicApp} from 'ionic-angular';
import {TabsPage} from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AccountService} from "../providers/account.service";
import {SettingService} from "../providers/setting.service";
import {CacheService} from "../providers/cache.service";
import {AppConfig} from "./app.config";

@Component({
  templateUrl: 'app.html',
  providers: [AccountService, SettingService]
})
export class MyApp {

  rootPage:any = 'TabsPage';
  backButtonPressed: boolean = false;
  @ViewChild(Nav) nav: Nav;
  tootClass:any = "";
  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, accountService: AccountService,
              public ionicApp: IonicApp,
              settingService: SettingService,public cacheService: CacheService, public app: AppConfig,
              public toastCtrl: ToastController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      setTimeout(()=>{
        splashScreen.hide();
      },2000);

      settingService.init(() => {
        accountService.dataInitForLaunch();
      });
      if(this.platform.is("ios") && this.platform.height() == 812 && this.platform.width() == 375){
        this.tootClass = "platform-iphonex"
      }


      //设置物理返回键
      this.platform.registerBackButtonAction(() => {
        //获取NavController
        let activePortal = this.ionicApp._modalPortal.getActive() ||this.ionicApp._overlayPortal.getActive();
        let loadingPortal = this.ionicApp._loadingPortal.getActive();
        if (activePortal) {
          //其他的关闭
          activePortal.dismiss().catch(() => {
          });
          activePortal.onDidDismiss(() => {
          });
          return;
        }
        if (loadingPortal) {
          //loading的话，返回键无效
          return;
        }
        let activeVC = this.nav.getActive();
        let page = activeVC.instance;
        if (!(page instanceof TabsPage)) {
          if (!this.nav.canGoBack()) {
            // 当前页面为tabs，退出APP
            return this.showExit();
          }
          // 当前页面为tabs的子页面，正常返回
          return this.nav.pop();
        }
        let tabs = page.tabRef;
        let activeNav = tabs.getSelected();
        if (activeNav.canGoBack()) {
          let backEventName = activeNav.getActive().instance.backEventName;
          if (backEventName) {
            activeNav.getActive().instance[backEventName]();
          } else {
            activeNav.pop();
          }
        }else {
          if (tabs == null || activeNav.id == 't0-0') {
            //执行退出
            this.showExit();
          } else {
            //选择首页第一个的标签
            tabs.select(0);
          }
        }


      });


    });

  }
  private showExit(): void {
    //如果为true，退出
    if (this.backButtonPressed) {
      this.platform.exitApp();
    } else {
      //第一次按，弹出Toast
      this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'middle',
        cssClass:'exist-app'
      }).present();
      //标记为true
      this.backButtonPressed = true;
      //两秒后标记为false，如果退出的话，就不会执行了
      setTimeout(() => this.backButtonPressed = false, 2000);
    }
  }
}
