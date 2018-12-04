import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpService} from "../../../providers/http.service";
import {BasePage} from "../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {CacheService} from "../../../providers/cache.service";
import {WidgetService} from "../../../providers/widget.service";
import {AppConfig} from "../../../app/app.config";

/**
 * Generated class for the HtmlInfo page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 * 这个页面所有文案类型都能用，只要传入的type能用
 */
@IonicPage()
@Component({
  selector: 'page-html-info',
  templateUrl: 'html-info.html',
})
export class HtmlInfoPage extends BasePage{

  title: string;

  type: string;

  content: string;
  checked:boolean = false;
  //title需要在这里加，如果不需要就不用加
  types: any = {
    'ABOUT_US': '关于我们',
    'GUAHAO': '预约须知',
    'REAL_GUAHAO': '挂号须知',
    'PARKING_PAYMENT': '停车须知',
    'DISCLAIMER': '免责声明'
  };

  constructor(public httpService: HttpService, public navCtrl: NavController, public navParams: NavParams, public app: AppConfig,
              public nativePageTransitions: NativePageTransitions, public cacheService: CacheService,public widgetService: WidgetService) {
    super(navCtrl, navParams, nativePageTransitions);
    this.type = this.navParams.data.type;
    this.title = this.types[this.type];
    // this.checked = this.cacheService.get('clinic.note.checked');
  }

  ionViewDidLoad() {
    this.httpService.getHtmlInfo(this.type)
      .subscribe(json => {
        if (json.success) {
          this.content = json.data.content;
        }
      })
  }

  showDeptList() {
    if(!this.checked){
      this.widgetService.toast("请勾选须知协议");
      return;
    }
    let guahaoType = '',
      appoitType = '';
    if(this.type == "REAL_GUAHAO"){
      guahaoType = 'SCHEDULE_REALTIME';
      appoitType = '0';
    }else{
      guahaoType = 'SCHEDULE_RESERVATION';
      appoitType = '1';
    }
    this.cacheService.clearClinicParam();
    this.cacheService.setClinicParam('type', 'clinic');
    this.cacheService.setClinicParam('guahaoType', guahaoType);
    this.httpService.getAppointDeptList(appoitType)
      .subscribe(json => {
        if (json.success) {
          if(json.data.length == 0){
            this.widgetService.toast('暂无排班');
            return;
          }
          this.cacheService.set('deptList', json.data);
          if (this.app.hospitalConfig.twoLevelDept == 1) {
            this.navCtrl.push('DeptTreeListPage');
          } else {
            this.navCtrl.push('DeptListPage');
          }
        }
      })
  }



}
