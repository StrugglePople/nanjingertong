import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BasePage} from "../../../../app/base";
import {HttpService} from "../../../../providers/http.service";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the CheckTestAnalysis page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-check-test-analysis',
  templateUrl: 'check-test-analysis.html'
})
export class CheckTestAnalysisPage extends BasePage {

  searchInput?: string;

  items: any[];

  constructor(public httpService: HttpService, public navCtrl: NavController, public navParams: NavParams,
              public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
  }

  ionViewDidLoad() {
    this.searchCheckSelf();
  }

  searchCheckSelf() {
    this.httpService.searchCheckSelf(this.searchInput ? this.searchInput : '')
      .subscribe(json => {
        if (json.success) {
          this.items = json.resultData;
        }
      })
  }

  itemSelected(item) {
    this.navCtrl.push('CheckTestAnalysisDetailPage', {code: item.itemCd})
  }

}
