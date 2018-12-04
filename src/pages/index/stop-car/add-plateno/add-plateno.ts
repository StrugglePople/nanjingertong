import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, Platform} from 'ionic-angular';
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
  selector: 'page-add-plateno',
  templateUrl: 'add-plateno.html',
})
export class AddPlateno extends BasePage{

  province:any = '苏';
  plateNo:any = '';
  select:boolean = false;

  constructor(public cacheService: CacheService, public navCtrl: NavController, public navParams: NavParams, public widgetService: WidgetService,
              public httpService: HttpService, public modalCtrl: ModalController, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
  }


  addPlateno(item){
    if((!this.select && this.plateNo.length != 6) || (this.select && this.plateNo.length != 8)){
      this.widgetService.toast('请输入正确的车牌号');
      return;
    }
    let data = {
      plateNo: this.province + this.plateNo
    };
    this.httpService.addPlateno(data).subscribe(json=>{
      if(json.success){
        this.navCtrl.pop();
      }
    })
  }
  showSelectProvince(){
    let ScheduleModal = this.modalCtrl.create('ProvinceModel',null,{
      showBackdrop:true,
      enableBackdropDismiss:true,
      cssClass:'opacity-3'
    });
    ScheduleModal.onDidDismiss(data => {
      if (!data) return;
        this.province = data;
    });
    ScheduleModal.present();
  }
}
