import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {CacheService} from "../../../../providers/cache.service";
import {BasePage} from "../../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {WidgetService} from "../../../../providers/widget.service";
declare let ZkPlugin: any;
/**
 * Generated class for the PayResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-province-model',
  templateUrl: 'province-model.html',
})
export class ProvinceModel extends BasePage{

  province:any[] = ['京','沪','浙','苏','粤','鲁','晋','冀','豫','川','渝','辽','吉','黑','皖','鄂','湘','赣',
    '闽','陕','甘','宁','蒙','津','贵','云','桂','琼','青','新','藏'];
  constructor(public cacheService: CacheService, public navCtrl: NavController, public navParams: NavParams, public widgetService: WidgetService,
              public viewCtrl: ViewController, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);

  }

  chooseProvince(value) {

    this.viewCtrl.dismiss(value);
  }


}
