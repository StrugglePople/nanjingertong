import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BasePage} from "../../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the HepatitisBSelfTestResult page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({

})
@Component({
  selector: 'page-hepatitis-b-self-test-result',
  templateUrl: 'hepatitis-b-self-test-result.html',
})
export class HepatitisBSelfTestResultPage extends BasePage{

  content: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams ,nativePageTransitions);
    this.content = this.navParams.data.content;
  }

}
