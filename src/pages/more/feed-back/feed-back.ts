import {Component, Inject, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AppConfig} from "../../../app/app.config";
import {WidgetService} from "../../../providers/widget.service";
import {HttpService} from "../../../providers/http.service";
import {ValidateService} from "../../../providers/validate.service";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {BasePage} from "../../../app/base";

/**
 * Generated class for the FeedBack page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-feed-back',
  templateUrl: 'feed-back.html',
})
export class FeedBackPage extends BasePage{

  content?: string;

  mobile?: string;

  @ViewChild('tt') tt: HTMLTextAreaElement;

  constructor(public app: AppConfig, public navCtrl: NavController, public navParams: NavParams, public widgetService: WidgetService,
              public httpService: HttpService, @Inject('DataService') public dataService, public validateService: ValidateService,
              public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.mobile = this.app.session ? this.app.session.mobile : '';
  }

  submitFeedback() {
    if (!this.content) {
      this.widgetService.toast("请填写反馈信息");
      return;
    }
    if(this.content.replace(/ /g,'').length === 0){
      this.widgetService.toast("反馈信息不能只包含空格");
      this.tt.value = '';
      return;
    }
    if (this.content.length > 250) {
      this.widgetService.toast("反馈信息不能超过250个字");
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
    this.httpService.feedBack(this.content, this.mobile)
      .subscribe(json => {
        this.widgetService.toast('反馈成功，感谢您的参与！', () => {
          this.navCtrl.pop();
        })
      })
  }
}
