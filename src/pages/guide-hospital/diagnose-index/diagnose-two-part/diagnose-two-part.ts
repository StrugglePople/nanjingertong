import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CacheService} from "../../../../providers/cache.service";
import {HttpService} from "../../../../providers/http.service";
import {BasePage} from "../../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the DiagnoseTwoPartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-diagnose-two-part',
  templateUrl: 'diagnose-two-part.html',
})
export class DiagnoseTwoPartPage extends BasePage{

  data;

  constructor(public cacheService: CacheService, public navCtrl: NavController, public navParams: NavParams,
              public httpService: HttpService, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.data = this.cacheService.get('diagnose.Two.' + this.cacheService.getDiagnoseParam('partCode') + '.' +
      this.cacheService.getDiagnoseParam('partType')).data;
  }


  showSymptom(item) {
    this.httpService.getSymptom(item.id)
      .subscribe(json => {
        if (json.success) {
          this.cacheService.set('symptom.data', {
            part: item,
            list: json.data
          });
          this.navCtrl.push('DiagnoseSymptomPage');
        }
      })
  }

}
