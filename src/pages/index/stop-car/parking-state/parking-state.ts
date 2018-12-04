import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {CacheService} from "../../../../providers/cache.service";
import {HttpService} from "../../../../providers/http.service";
import {BasePage} from "../../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {WidgetService} from "../../../../providers/widget.service";
import {AppConfig} from "../../../../app/app.config";
declare let ZkPlugin: any;
/**
 * Generated class for the PayResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-parking-state',
  templateUrl: 'parking-state.html',
})
export class ParkingState extends BasePage{


  parkingState:any[] = [];

  constructor(public cacheService: CacheService, public navCtrl: NavController, public navParams: NavParams, public widgetService: WidgetService,
              public httpService: HttpService, public app: AppConfig, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
  }
  ionViewWillEnter(){
    this.searcParkingState();
  }

  searcParkingState(){
    this.httpService.searcParkingState().subscribe(json=>{
      if(json.success){
        this.parkingState = json.data;
      }
    })
  }
  openMap(type) {
    if (this.app.isInApp) {
      ZkPlugin.openMap(this.app.baiduMapData[type]);
    }
  }

  showParkDistribution(){
    this.httpService.getParkDistribution().subscribe(json=>{
      if(json.success){
        this.navCtrl.push('ParkingDistribution',json.data)
      }
    })
  }

}
