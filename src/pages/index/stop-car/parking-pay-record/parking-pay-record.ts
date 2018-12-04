import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
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
  selector: 'page-parking-pay-record',
  templateUrl: 'parking-pay-record.html',
})
export class ParkingPayRecord extends BasePage{

  plateno:any;
  paylist:any[] = [];

  constructor(public cacheService: CacheService, public navCtrl: NavController, public navParams: NavParams, public widgetService: WidgetService,
              public httpService: HttpService, public platform: Platform, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.plateno = this.navParams.data;
    this.showParkingPayRecord();
  }


  showParkingPayRecord(){
    this.httpService.showParkingPayRecord().subscribe(json=>{
      if(json.success){
        this.paylist = json.data;
      }
    })
  }

}
