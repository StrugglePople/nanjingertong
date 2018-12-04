import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {BasePage} from "../../../app/base";

/**
 * Generated class for the InspectRecordDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-inspect-record-detail',
  templateUrl: 'inspect-record-detail.html',
})
export class InspectRecordDetailPage extends BasePage{

  data;

  constructor(public navCtrl: NavController, public navParams: NavParams, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);

    this.data = this.navParams.data;
  }


}
