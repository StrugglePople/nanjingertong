import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpService} from "../../../../providers/http.service";
import {BasePage} from "../../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the CheckTestAnalysisDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-check-test-analysis-detail',
  templateUrl: 'check-test-analysis-detail.html'
})
export class CheckTestAnalysisDetailPage extends BasePage{

  item?: any;
  code: string;

  constructor(public httpService: HttpService, public navCtrl: NavController, public navParams: NavParams,
              public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.code = this.navParams.data.code;
  }

  ionViewDidLoad() {
    this.httpService.searchCheckSelfDetail(this.code)
      .subscribe( json => {
          if (json.success) {
            this.item = json.resultData
          }
        }
      )
  }

}
