import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CacheService} from "../../../../providers/cache.service";
import {WidgetService} from "../../../../providers/widget.service";
import {HttpService} from "../../../../providers/http.service";
import {BasePage} from "../../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the DiagnoseSelectedSymptomPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-diagnose-selected-symptom',
  templateUrl: 'diagnose-selected-symptom.html',
})
export class DiagnoseSelectedSymptomPage extends BasePage{

  data;

  constructor(public cacheService: CacheService, public navCtrl: NavController, public navParams: NavParams,
              public widgetService: WidgetService,public httpService: HttpService,
              public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.data = this.getData();
  }

  getData() {
    let map = this.cacheService.getDiagnoseParam('select.symptom'),
      array = [];
    for (let x in map) {
      array.push(map[x]);
    }
    return array;
  }

  clickSymptom(item) {
    let map = this.cacheService.getDiagnoseParam('select.symptom') || {};
    delete map[item.id];
    this.cacheService.setDiagnoseParam('select.symptom', map);
    let index = this.data.indexOf(item);
    this.data.splice(index, 1);
  }

  showDiseaseView = function() {
    if (this.data.length == 0) {
      this.widgetService.toast('请选择病症');
      return;
    }
    let ids = '';
    for (let i = 0; i < this.data.length; i++) {
      ids += this.data[i].id + '+';
    }
    ids = ids.substr(0, ids.length - 1);
    this.httpService.getDisease(ids)
      .subscribe(json => {
        if (json.success) {
          this.cacheService.set('disease.data', json.data);
          this.navCtrl.push('DiagnoseDiseasePage');
        }
      })
  }
}
