import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {CacheService} from "../../../../providers/cache.service";
import {HttpService} from "../../../../providers/http.service";
import {WidgetService} from "../../../../providers/widget.service";
import {BasePage} from "../../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the PregnantSetDatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pregnant-set-date',
  templateUrl: 'pregnant-set-date.html',
})
export class PregnantSetDatePage extends BasePage{

  lmpStr: ''; //最后一次月经开始时间

  mc: ''; //月经周期/天

  mcs = [];

  member;
  constructor(public navCtrl: NavController, public navParams: NavParams, public cacheService: CacheService,
              public httpService: HttpService, public modalCtrl: ModalController, public widgetService: WidgetService,
              public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    for(let i = 15; i < 46; i++){
      this.mcs.push(i);
    }
  }

  chooseMember() {
    let memberModal = this.modalCtrl.create('MemberSelectModalPage', {type: 'FEMALE'});
    memberModal.onDidDismiss(data => {
      if (!data) return;
      let newMember = data.member;
      if (this.member && this.member.id == newMember.id) return;
      this.member = newMember;
      this.cacheService.set('cache.FEMALE', newMember);
      this.loadDate();
    });
    memberModal.present();
  }

  loadDate() {
    this.lmpStr = '';
    this.mc = '';
    this.cacheService.removeKey('cache.preDate');
    if (this.member.id) {
      this.httpService.getPreDate(this.member.id)
        .subscribe(json => {
          if (json.success) {
            this.mc = json.data.mc;
            this.lmpStr = json.data.lmpStr;
            // this.cacheService.set('cache.preDate', json.data);
          }
        })

    }
  }

  searchResult() {
    if (!this.member) {
      this.widgetService.toast('请选择持卡人');
      return;
    }
    if(!this.lmpStr){
      this.widgetService.toast('请选择最后一次月经开始日期');
      return;
    }
    if(!this.mc){
      this.widgetService.toast('请选择月经周期');
      return;
    }
    this.httpService.addPreDate(this.member.id, this.mc, this.lmpStr)
      .subscribe(json => {
        if (json.success) {
          this.cacheService.set('cache.preDate', json.data);
          this.navCtrl.push('PregnantHealthPage');
        }
      });
  }

}
