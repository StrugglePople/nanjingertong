/**
 * Created by Administrator on 2017/5/16 0016.
 */
import { NavController, NavParams } from 'ionic-angular';
import {AppConfig} from "./app.config";
import {WidgetService} from "../providers/widget.service";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";

export class BasePage {



  constructor(public navCtrl: NavController, public navParams: NavParams, public nativePageTransitions?: NativePageTransitions,
              public app?: AppConfig, public widgetService?: WidgetService) {
  }

  /**
   * 导航push page,
   * @param page 你的page名字
   * @param obj 传递到下一个页面的数据，如果需要登录就加needLogin参数为true
   */
  public pushView(page: string, obj?:any) {
    // let options: NativeTransitionOptions = {
    //   direction: 'left',
    //   duration: 300,
    //   slowdownfactor: 3,
    //   slidePixels: 20,
    //   iosdelay: 20,
    //   androiddelay: 50,
    //   fixedPixelsTop: 0,
    //   fixedPixelsBottom: 60
    // };
    // this.nativePageTransitions.slide(options);
    if (obj) {
      if (obj.needLogin && !this.app.session) {
        this.navCtrl.push('LoginPage');
        return;
      }
      this.navCtrl.push(page, obj);
    } else {
      this.navCtrl.push(page);
    }
  }

  //正在建设的功能提示
  public noOpen() {
    this.widgetService.toast('服务正在建设中')
  }

  //克隆数组，如果克隆对象用 {...你的对象}
  public cloneArray(items) {
    let array = [];
    for(let item of items) {
      array.push({...item});
    }
    return array;
  }

  public popToRoot() {
    this.navCtrl.popToRoot();
  }

  // ionViewWillLeave() {
    // let options: NativeTransitionOptions = {
    //   direction: 'right',
    //   duration: 300,
    //   slowdownfactor: 3,
    //   slidePixels: 20,
    //   iosdelay: 20,
    //   androiddelay: 50,
    //   fixedPixelsTop: 0,
    //   fixedPixelsBottom: 60
    // };
    //
    // this.nativePageTransitions.slide(options);
  // }
}
