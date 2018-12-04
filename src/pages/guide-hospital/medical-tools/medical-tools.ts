import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BasePage} from "../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the KnowledgeRepository page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-medical-tools',
  templateUrl: 'medical-tools.html',
})
export class MedicalToolsPage extends BasePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
  }

}
