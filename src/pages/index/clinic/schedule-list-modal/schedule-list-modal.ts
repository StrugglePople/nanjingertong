import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the ScheduleListModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-schedule-list-modal',
  templateUrl: 'schedule-list-modal.html',
})
export class ScheduleListModalPage {

  schedule;

  wtimes;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.schedule = this.navParams.data.schedule;
    this.wtimes = this.navParams.data.wtimes;
  }

  chooseScheduleTime(time) {
    if(time.leftNum <=0 ){
      return;
    }
    this.viewCtrl.dismiss({time: time});
  };

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
