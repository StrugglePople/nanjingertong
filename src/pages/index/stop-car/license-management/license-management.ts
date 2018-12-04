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
  selector: 'page-license-management',
  templateUrl: 'license-management.html',
})
export class LicenseManagement extends BasePage{


  plateno:any[] = [];
  hide:boolean = false;

  constructor(public cacheService: CacheService, public navCtrl: NavController, public navParams: NavParams, public widgetService: WidgetService,
              public httpService: HttpService, public platform: Platform) {
    super(navCtrl, navParams);
  }
  ionViewWillEnter(){
    this.hide = false;
    this.getplatenobyaccount();
  }
  ionViewWillLeave(){
    this.hide = true;
  }

  getplatenobyaccount(){
    this.httpService.getplatenobyaccount().subscribe(json=>{
      if(json.success){
        this.plateno = json.data || [];
      }
    })
  }
  deletePlateno(item){
    this.httpService.deletePlateno(item).subscribe(json=>{
      if(json.success){
        for(let i=0;i<this.plateno.length;i++){
          if(this.plateno[i].id == item.id){
            this.plateno.splice(i, 1);
          }
        }
      }
    })
  }

  showParkingPay(item){
    this.httpService.showParkingPay(item).subscribe(json=>{
      if(json.success){

      }
    })
  }




}
