import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BasePage} from "../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the HospitalInNavDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hospital-in-nav-detail',
  templateUrl: 'hospital-in-nav-detail.html',
})
export class HospitalInNavDetailPage extends BasePage{

  title;

  data;

  constructor(public navCtrl: NavController, public navParams: NavParams, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl ,navParams, nativePageTransitions);
    this.data = this.navParams.data.item;
    this.title = this.data.name;
  }

}
