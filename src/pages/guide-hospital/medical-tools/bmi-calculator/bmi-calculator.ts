import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ValidateService} from "../../../../providers/validate.service";
import {WidgetService} from "../../../../providers/widget.service";
import {BasePage} from "../../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the BmiCalculator page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-bmi-calculator',
  templateUrl: 'bmi-calculator.html'
})
export class BmiCalculatorPage extends BasePage{

  private height: string;

  private weight: string;

  constructor(public widget: WidgetService, public validate: ValidateService, public navCtrl: NavController,
              public navParams: NavParams, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
  }

  public searchResult() {
    if (!this.validate.isNumber(this.height) || !this.validate.isNumber(this.weight)) {
      this.widget.toast('身高和体重必须是正数');
      return;
    }
    let th = Number(this.height),
      tw = Number(this.weight);
    if (th < 0 || tw < 0) {
      this.widget.toast('身高和体重都不能小于等于0');
      return;
    }
    let result = (tw/th/th * 10000);
    if(result < 15 || result > 45){
      this.widget.toast('BMI计算异常，请输入正确的身高和体重值');
      return;
    }
    this.navCtrl.push('BmiResultPage', {height: th, weight: tw});
  }

}
