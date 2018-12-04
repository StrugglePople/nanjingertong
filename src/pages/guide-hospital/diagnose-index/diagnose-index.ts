import {Component, ElementRef, Inject, Renderer2, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Select} from 'ionic-angular';
import {HttpService} from "../../../providers/http.service";
import {CacheService} from "../../../providers/cache.service";
import {BasePage} from "../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the DiagnoseIndexPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-diagnose-index',
  templateUrl: 'diagnose-index.html',
})
export class DiagnoseIndexPage extends BasePage {

  @ViewChild('sel') sel: Select;

  selectType = '1'; //1图片，0列表

  sex = 'man';

  orientation = 'front';

  selectAgeItem;

  ageItems;

  imageItems;

  partList;

  orientationChecked = true;

  constructor(@Inject('DataService') public dataService,public navCtrl: NavController, public navParams: NavParams,
              public render2: Renderer2, public httpService:HttpService, public cacheService: CacheService, private el:ElementRef,
              public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.imageItems = this.dataService.diagnose.imgItems;
    this.selectAgeItem = this.dataService.diagnose.ageItems[0];
    this.ageItems = this.dataService.diagnose.ageItems;
  }

  ionViewDidLoad() {
    console.log('sssss');
    this.cacheService.clearDiagnoseParam();
    let element = this.el.nativeElement.querySelector('.toggle-inner');
    element.innerText = this.orientationChecked ? '正' : '反';
  }

  //图片和列表选择
  segmentChanged(value) {
    let partType = this.selectAgeItem[this.sex];
    this.httpService.getDiagnoseFirstPart(partType)
      .subscribe(json => {
        if (json.success) {
          if (!json.isCache) {
            this.cacheService.set('diagnose.first.' + partType, {
              time: new Date().getTime(),
              data: json.data
            });
          } else {
            this.partList = json.data;
          }
        }
      });
  }

  //打人小孩（年龄）选择
  select(val) {
    this.selectAgeItem = val;
  }

  //点击图片中部位
  showImgTwoPart($event,item) {
    let el = this.render2.createElement('div');
    this.render2.addClass(el,'ui-body-point-wrapper');
    let el1 = this.render2.createElement('div');
    this.render2.addClass(el1,'point');
    this.render2.appendChild(el, el1);
    this.render2.appendChild($event.target, el);
    setTimeout(()=> {
      this.render2.removeChild($event.target, el);
      this.showTwoPart(item);
    }, 180);
  };

  //改变正反面
  changeOrientation() {
    this.orientation = this.orientationChecked ? 'front' : 'back';
    let element = this.el.nativeElement.querySelector('.toggle-inner');
    element.innerText = this.orientationChecked ? '正' : '反';
  };

  showTwoPart(item) {
    this.cacheService.setDiagnoseParam('partType', this.selectAgeItem[this.sex]);
    this.cacheService.setDiagnoseParam('partCode', item.partCode);
    let partType = this.selectAgeItem[this.sex];
    this.httpService.getDiagnoseTwoPart(item.partCode, partType)
      .subscribe(json => {
        if (json.success) {
          if (!json.isCache) {
            let part = json.data.splice(0, 1);
            this.cacheService.set('diagnose.Two.' + item.partCode + '.' + partType, {
              time: new Date().getTime(),
              data: {
                part: part[0],
                list: json.data
              }
            });
          }
          this.navCtrl.push('DiagnoseTwoPartPage');
        }
      });
  }
}
