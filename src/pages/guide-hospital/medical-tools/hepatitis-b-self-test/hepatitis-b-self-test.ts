import {Component, Inject} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpService} from "../../../../providers/http.service";
import {BasePage} from "../../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the HepatitisBSelfTest page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hepatitis-b-self-test',
  templateUrl: 'hepatitis-b-self-test.html'
})
export class HepatitisBSelfTestPage extends BasePage{

  items: any[];
  param = {};

  constructor(public httpService: HttpService, public navCtrl: NavController, public navParams: NavParams,
              @Inject('DataService') public dataService, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.items = this.dataService.hepatitisB;
    for (let item of this.items) {
      this.param[item.property] = 1;
    }
  }

  searchHepatitis() {
    this.httpService.searchHepatitis(this.param)
      .subscribe(json => {
        if (json.success) {
          this.navCtrl.push('HepatitisBSelfTestResultPage', {content: json.successMsg});
        }
      })
  }
}
