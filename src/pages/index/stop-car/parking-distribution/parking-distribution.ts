import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform,Content} from 'ionic-angular';
import {CacheService} from "../../../../providers/cache.service";
import {HttpService} from "../../../../providers/http.service";
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
  selector: 'page-parking-distribution',
  templateUrl: 'parking-distribution.html',
})
export class ParkingDistribution extends BasePage{

  pet:any[] = [];
  selected:any;
  scrollHeight:any;
  @ViewChild(Content) content: Content;
  @ViewChild('parkingimg') parkingimg: ElementRef;
  constructor(public cacheService: CacheService, public navCtrl: NavController, public navParams: NavParams, public widgetService: WidgetService,
              public httpService: HttpService, public platform: Platform, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.pet = this.navParams.data;
    this.selected = '0';
  }
  ionViewDidEnter() {
    this.scrollHeight = this.content.contentHeight - 70;

  }

  ionViewDidLoad() {
    setTimeout(()=>{
      this.parkingimg.nativeElement.scrollLeft = (1380 - this.content.contentWidth)/2;
    },200);

  }

}
