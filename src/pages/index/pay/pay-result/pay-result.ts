import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {CacheService} from "../../../../providers/cache.service";
import {HttpService} from "../../../../providers/http.service";
import {BasePage} from "../../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {WidgetService} from "../../../../providers/widget.service";

/**
 * Generated class for the PayResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pay-result',
  templateUrl: 'pay-result.html',
})
export class PayResultPage extends BasePage{

  @ViewChild('timeRef') timeRef: ElementRef;

  success;

  data;

  interval;

  marginTop;

  constructor(public cacheService: CacheService, public navCtrl: NavController, public navParams: NavParams, public widgetService: WidgetService,
              public httpService: HttpService, public platform: Platform, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.success = this.navParams.data.success;
    this.data = this.cacheService.get("cache.selectPayViewData");
    this.marginTop = ((this.platform.height() - 64 - 44)/2 - 100)/10;
  }

  ionViewDidEnter() {
    this.httpService.setTimeoutmin(3000);
    if(this.timeRef.nativeElement.innerText * 1<=0){
      return;
    }
    if (this.success) {
      this.interval = setInterval(()=> {
        let num = this.timeRef.nativeElement.innerText * 1;
        num--;
        this.timeRef.nativeElement.innerText = num;
        if (num == 0) {
          // clearInterval(this.interval);
          this.handleBack();
          return;
        }
      }, 1000);
    }
  }

  //10秒后返回，或者左上角返回
  handleBack() {
    clearInterval(this.interval);
    if (this.success) {
      //预约挂号
      if (this.data.source == 'regPay' || this.data.source == 'confirmPay') {
        this.httpService.getRegDetail(this.data.appointId)
          .subscribe(json1 => {
            if (json1.success) {
              this.cacheService.clearDiagnoseParam();
              if(this.navCtrl.id == 't0-0'){
                this.navCtrl.setPages([{page:'IndexPage'},{page:'AppointmentRecordDetailPage',params:json1.data}]);
              }else if(this.navCtrl.id == 't0-1'){
                this.navCtrl.setPages([{page:'GuideHospitalPage'},{page:'AppointmentRecordDetailPage',params:json1.data}]);
              }else if(this.navCtrl.id == 't0-2'){
                this.navCtrl.setPages([{page:'RecordPage'},{page:'AppointmentRecordDetailPage',params:json1.data}]);
              }else if(this.navCtrl.id == 't0-3'){
                this.navCtrl.setPages([{page:'CenterPage'},{page:'AppointmentRecordDetailPage',params:json1.data}]);
              }
            }else{
              // this.widgetService.toast('查询记录详情失败');
              setTimeout(()=>{
                this.navCtrl.popToRoot();
              },2500);

            }

          })
      } else if (this.data.source == 'selfPay' || this.data.source == 'selfAllPay') { //诊间费用
          // this.navCtrl.push('SelfPayPage');
        this.navCtrl.setPages([{page:'IndexPage'},{page:'SelfPayPage'}]);
      } else if (this.data.source == 'cardCharge') { //门诊充值
        this.navCtrl.setPages([{page:'IndexPage'},{page:'RrechargeRecordPage',params:{'needLogin': true,chargeType:'MEDICAL_CARD_CHARGE',noClear:true}}]);
        // this.navCtrl.push('RrechargeRecordPage',{'needLogin': true,chargeType:'MEDICAL_CARD_CHARGE',noClear:true});
      }else if (this.data.source == 'ZhuyuanCharge') { //门诊充值
        this.navCtrl.setPages([{page:'IndexPage'},{page:'RrechargeRecordPage',params:{'needLogin': true,chargeType:'IN_PATIENT_CHARGE',noClear:true}}]);
      }else if (this.data.source == 'stopCarPay'){
        this.navCtrl.setPages([{page:'IndexPage'},{page:'StopCar'},{page:'ParkingPayRecord'}]);
      }
      return;
    }
    this.navCtrl.pop();
  }

}
