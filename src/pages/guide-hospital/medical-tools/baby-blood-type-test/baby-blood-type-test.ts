import {Component, Inject} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpService} from "../../../../providers/http.service";
import {BasePage} from "../../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the BabyBloodTypeTest page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-baby-blood-type-test',
  templateUrl: 'baby-blood-type-test.html'
})
export class BabyBloodTypeTestPage extends BasePage{
  param = {};
  xuexign :any[] = ['A', 'B', 'AB', 'O'];
  constructor(public httpService: HttpService, @Inject('DataService') public dataService, public navCtrl: NavController,
              public navParams: NavParams, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl ,navParams, nativePageTransitions);
    // this.xuexign = this.dataService.blood;
  }

  changeBlood(type,data) {

    this.param[type] = data;
  }

  searchBlood() {
    var dad = this.dataService.blood.indexOf(this.param['dad']),
        mun = this.dataService.blood.indexOf(this.param['mun']);
    this.httpService.searchBlood(dad, mun)
      .subscribe(json => {
        if (json.success) {
          this.param['result'] = {
            p: json.resultData.possibleBlood,
            np: json.resultData.impossibleBlood,
          }
        } else {
          this.param['result'] = null;
        }
      })
  }
}
