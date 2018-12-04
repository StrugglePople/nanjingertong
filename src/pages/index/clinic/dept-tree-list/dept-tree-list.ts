import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {CacheService} from "../../../../providers/cache.service";
import {BaseClinicPage} from "../baseClinic";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the DeptTreeListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dept-tree-list',
  templateUrl: 'dept-tree-list.html',
})
export class DeptTreeListPage extends BaseClinicPage {

  depts;

  searchStr;

  selectOneDept;

  twoDepts;

  scrollHeight;

  @ViewChild('content') content: Content;

  constructor(public cacheService: CacheService, public navCtrl: NavController, public navParams: NavParams,
              public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.depts = this.cacheService.get('deptList');
    if (!this.searchStr && !this.selectOneDept) {
      this.selectDept(this.depts[0]);
    }
  }

  ionViewDidEnter() {
    let a  = this.content;
    this.scrollHeight = this.content.contentHeight - 44;

  }

  getItems(ev) {
    let val = ev.target.value;
    if (this.searchStr == val) return;
    this.searchStr = val;
    if (!this.searchStr) {
      this.selectDept(this.selectOneDept || this.depts[0]);
      return;
    }
    this.twoDepts = this.filterDeparts(1, this.depts, this.searchStr);
  }

  selectDept(dept) {
    this.searchStr = '';
    this.selectOneDept = dept;
    // this.twoDepts = dept.childDeptList;
  }

  clickDept(dept) {
    this.cacheService.setClinicParam('dept', dept);
    this.cacheService.set('expertList', '');
    if (this.cacheService.getClinicParam('type') == 'clinic') {
      this.navCtrl.push('ExpertListPage');
    } else if (this.cacheService.getClinicParam('type') == 'introduce') {
      if (this.cacheService.getClinicParam('sub.type') == 'dept') {
        this.navCtrl.push('DeptInfoPage');
      } else {
        this.cacheService.set('expertList', '');
        this.navCtrl.push('ExpertCommonListPage');
      }
    }
  };

}
