import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpService} from "../../../providers/http.service";
import {WidgetService} from "../../../providers/widget.service";
import {CallNumber} from "@ionic-native/call-number";
import {BasePage} from "../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the ContactHospital page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contact-hospital',
  templateUrl: 'contact-hospital.html',
  providers: [CallNumber]
})
export class ContactHospitalPage extends BasePage{

  phone: string;

  constructor(public httpService: HttpService, public widgetService: WidgetService, public navCtrl: NavController,
              public navParams: NavParams, public callNumber: CallNumber, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
  }

  ionViewDidLoad() {
    this.httpService.getHtmlInfo('PHONE_NUMBER')
      .subscribe(json => {
        if (json.success) {
          this.phone = json.data.content;
        }
      })
  }


  call() {
    /*this.widgetService.confirm(this.phone, () => {
      this.callNumber.callNumber(this.phone, true);
    }, '联系医院', '拨号');*/
    this.callNumber.callNumber(this.phone, true);
  }
}
