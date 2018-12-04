import {Component, ElementRef, Renderer2} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CacheService} from "../../../../providers/cache.service";
import {HttpService} from "../../../../providers/http.service";
import {BasePage} from "../../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the DiagnoseDiseasePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-diagnose-disease',
  templateUrl: 'diagnose-disease.html',
})
export class DiagnoseDiseasePage extends BasePage{

  data;

  constructor(public cacheService: CacheService, public navCtrl: NavController, public navParams: NavParams,
              public httpService: HttpService, public el: ElementRef, public renderer2: Renderer2,
              public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.data = this.cacheService.get('disease.data');
  }

  ionViewDidEnter() {
    this.renderDegree();
  }

  renderDegree() {
    let els = this.el.nativeElement.querySelectorAll('.degree-arc');
    for (let i = 0; i < els.length; i++) {
      this.renderArc(els[i], i);
    }
  }

  renderArc(el, index) {
    let matchDegree = this.data[index]['matchDegree'],
      ctx = el.getContext('2d');
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = '#ff0000';
    ctx.translate(20, 20);
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, 20, 0, Math.PI * 2 * (matchDegree/100));
    // 闭合路径
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  showDetailView(item) {
    this.httpService.getDiseaseDetail(item.id)
      .subscribe(json => {
        if (json.success) {
          this.cacheService.set('disease.detail.data', json.data);
          this.navCtrl.push('DiagnoseDiseaseDetailPage');
        }
      })
  }
}
