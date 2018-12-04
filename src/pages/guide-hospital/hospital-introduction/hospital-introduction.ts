import {Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpService} from "../../../providers/http.service";
import {WidgetService} from "../../../providers/widget.service";
import {CallNumber} from "@ionic-native/call-number";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {BasePage} from "../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the HospitalIntroduction page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hospital-introduction',
  templateUrl: 'hospital-introduction.html',
  providers: [CallNumber]
})
export class HospitalIntroductionPage extends BasePage{

  index: number = 0;

  content: any = {
    0: '',
    1: '',
    2: '',
    3: '',
  };
  imgUrlPrefix:any = "assets/image/index/hospital-intro.png";
  typeA: string[] = ['HOSPITAL_INFO', 'TRAFFIC', 'WEBSITE', 'PHONE_NUMBER'];

  @ViewChild('site') site: ElementRef;

  @ViewChild('phone') phone: ElementRef;

  constructor(public httpService: HttpService, public widgetService: WidgetService, public navCtrl: NavController,
              public navParams: NavParams,  public callNumber: CallNumber, private iab: InAppBrowser,
              public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
  }

  ionViewDidLoad() {
    this.selectTab(this.index);
  }

  selectTab(index) {
    this.index = index;
    if (!this.content[index]) {
      this.httpService.getHtmlInfo(this.typeA[index])
        .subscribe(json => {
          if (json.success) {
            if (index == 3) {
              json.data.content = json.data.content.split('_');
            }
            this.content[index] = json.data.content;

          }
        })
    }
  }

  showWebSite() {
    let siteStr: string = this.site.nativeElement.innerText;
    this.widgetService.confirm(siteStr, () => {
      let browser = this.iab.create(siteStr, '_system');
      browser.show();
    }, '打开网页', '打开');
  }

  call(data) {
    let phoneStr: string = data.split('：')[1];
    /*this.widgetService.confirm(phoneStr, () => {
      this.callNumber.callNumber(phoneStr, true);
    }, '联系医院', '拨号')*/
    this.callNumber.callNumber(phoneStr, true);
  }
}
