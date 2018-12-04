import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpService} from "../../../providers/http.service";
import {BasePage} from "../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the HealthInformationDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-health-information-detail',
  templateUrl: 'health-information-detail.html'
})
export class HealthInformationDetailPage extends BasePage{

  private news: any = {};
  private title: any;

  constructor(public httpService: HttpService, public navCtrl: NavController, public navParams: NavParams,
              public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.title = this.navParams.data.title;
  }

  ionViewDidLoad() {
    this.httpService.loadHealthNewsDetail(this.navParams.data.newsId,3)
      .subscribe(json => {
        if (json.success) {
          this.news = json.resultData;
        }
      });
  }

}
