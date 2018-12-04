import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpService} from "../../../providers/http.service";
import {BasePage} from "../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the HospitalInNavDetail2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hospital-in-nav-detail2',
  templateUrl: 'hospital-in-nav-detail2.html',
})
export class HospitalInNavDetail2Page extends BasePage{

  items;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpService,
              public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.loadData();
  }

  loadData() {
    this.httpService.getBuildingAll()
      .subscribe(json => {
        if (json.success) {
          this.items = json.data;
        }
      })
  }
}
