import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CacheService} from "../../../../providers/cache.service";
import {BasePage} from "../../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the DiagnoseSymptomPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-diagnose-symptom',
  templateUrl: 'diagnose-symptom.html',
})
export class DiagnoseSymptomPage extends BasePage {

  data = {};

  constructor(public cacheService: CacheService,public navCtrl: NavController, public navParams: NavParams,
              public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.data = this.handleData(this.cacheService.get('symptom.data'));
  }

  ionViewWillEnter() {
    this.data = this.handleData(this.cacheService.get('symptom.data'));
  }

  handleData(data) {
    let list = data.list,
      map = this.cacheService.getDiagnoseParam('select.symptom') || {};
    for (let i = 0; i < list.length; i++) {
      if (map[list[i].id]) {
        list[i].checked = true;
      }
    }
    return data;
  }

  clickSymptom(item) {
    item.checked = !item.checked;
    let map = this.cacheService.getDiagnoseParam('select.symptom') || {};
    if (item.checked) {
      map[item.id] = item;
    } else {
      delete map[item.id];
    }
    this.cacheService.setDiagnoseParam('select.symptom', map);
  }
}
