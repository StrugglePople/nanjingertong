import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';
import {BasePage} from "../../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the PregnantHealthPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pregnant-health',
  templateUrl: 'pregnant-health.html',
})
export class PregnantHealthPage extends BasePage{

  @ViewChild('tabs') tabRef: Tabs;

  tab1Root = 'PregnantSelfTestPage';
  tab2Root = 'PregnantNotePage';
  tab3Root = 'PregnantCheckTimePage';

  constructor(public navCtrl: NavController, public navParams: NavParams, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
  }
}
