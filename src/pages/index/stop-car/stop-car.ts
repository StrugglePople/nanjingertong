import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BasePage} from "../../../app/base";
import {HttpService} from "../../../providers/http.service";
import {WidgetService} from "../../../providers/widget.service";
import {AppConfig} from "../../../app/app.config";
import {Device} from "@ionic-native/device";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
declare let ZkPlugin: any;
/**
 * Generated class for the More page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-stop-car',
  templateUrl: 'stop-car.html'
})
export class StopCar extends BasePage {


  constructor(public httpService: HttpService, public widgetService: WidgetService, public navCtrl: NavController,
              public navParams: NavParams, public app: AppConfig, public device: Device) {
    super(navCtrl, navParams);
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
