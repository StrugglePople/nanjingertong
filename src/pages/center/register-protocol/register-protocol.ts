import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpService} from "../../../providers/http.service";
import {BasePage} from "../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the RegisterProtocolPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register-protocol',
  templateUrl: 'register-protocol.html',
})
export class RegisterProtocolPage extends BasePage {

  content?: string;

  constructor(public httpService: HttpService, public navCtrl: NavController, public navParams: NavParams,
              public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
  }

  ionViewDidLoad() {
    this.httpService.getHtmlInfo('USER_REG_PROTOCOL')
      .subscribe(json => {
        if (json.success) {
          this.content = json.data.content
        }
      });
  }

}
