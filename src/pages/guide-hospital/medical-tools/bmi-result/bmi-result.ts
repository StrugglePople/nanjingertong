import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpService} from "../../../../providers/http.service";
import {BasePage} from "../../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the BmiResult page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-bmi-result',
  templateUrl: 'bmi-result.html'
})
export class BmiResultPage extends BasePage{

  public result;

  @ViewChild('point') point: ElementRef;

  constructor(private httpService: HttpService, public navCtrl: NavController, public navParams: NavParams,
              public render: Renderer2, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.result = this.httpService.calculateResult(this.navParams.data.height, this.navParams.data.weight);
  }

  ionViewDidEnter() {
    this.render.setStyle(this.point.nativeElement, 'left', this.result.left/10 + 'rem');
  }

}
