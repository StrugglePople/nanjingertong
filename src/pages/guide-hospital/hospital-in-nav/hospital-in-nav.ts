import { Component,ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform,Scroll} from 'ionic-angular';
import {HttpService} from "../../../providers/http.service";
import {BasePage} from "../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the HospitalInNavPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hospital-in-nav',
  templateUrl: 'hospital-in-nav.html',
})
export class HospitalInNavPage extends BasePage{
  alloptions = {
    guangzhou:{
      areamap: [
        {
          id: '1',
          name: '急诊内科楼',
          coords: [362, 347, 178, 117]
        },
        {
          id: '2',
          name: '门诊楼',
          coords: [79, 363, 231, 103]
        },
        {
          id: '3',
          name: '住院楼',
          coords: [368, 122, 181, 147]
        },
        {
          id: '4',
          name: '感染康复楼',
          coords: [113, 276, 231, 77]
        },
        {
          id: '5',
          name: '综合楼',
          coords: [353, 7, 191, 79]
        },
        {
          id: '6',
          name: '行政楼',
          coords: [141, 140, 183, 90]
        }
      ],
      mapWidth: 605,
      mapHeight: 554,
      scaledWidth: 0,
      scaledHeight: 0,
      zoomMax: 2
    },
    hexi:{
      areamap: [
        {
          id: '1',
          name: '门诊楼',
          coords: [271, 346, 274, 146]
        },
        {
          id: '2',
          name: '医技病房楼',
          coords: [292, 192, 249, 130]
        },
        {
          id: '3',
          name: '综合楼',
          coords: [583, 172, 82, 56]
        },
        {
          id: '4',
          name: '感染楼',
          coords: [698, 172, 103, 42]
        }
      ],
      mapWidth: 1000,
      mapHeight: 707,
      scaledWidth: 0,
      scaledHeight: 0,
      zoomMax: 2
    }
  };
  options;

  areamap = [];
  address:any;
  @ViewChild (Scroll) scroll:Scroll;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,
              public httpService: HttpService, public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.address = this.navParams.data.address;
    this.options = this.alloptions[this.navParams.data.address]
  }

  ionViewDidLoad() {
    this.areamap = this.fixNavPicAndMapCoords();
    setTimeout(()=>{
      this.scroll._scrollContent.nativeElement.scrollLeft = (this.options.scaledWidth*1.2 - this.platform.width())/2;
    },200);

  }

  fixNavPicAndMapCoords() {
    if (this.options.scaledWidth && this.options.scaledHeight)
      return;  // already done
    let devicePixelRatio = window.devicePixelRatio || 1,
      mapWidth = this.options.mapWidth,
      mapHeight = this.options.mapHeight,
      oWidth = Math.round(mapWidth / devicePixelRatio),
      oHeight = Math.round(mapHeight / devicePixelRatio),
      ratio,
      areamap = this.options.areamap;
    this.options.scaledHeight = this.platform.height() - 20 - 44;
    ratio = oHeight / this.options.scaledHeight;
    this.options.scaledWidth = Math.round(oWidth / ratio);
    this.options.zoomMax = Math.max(ratio, devicePixelRatio);

    ratio = this.options.scaledWidth / mapWidth;
    for (let i = 0; i < areamap.length; ++i) {
      let coords = areamap[i].coords;
      for (var j = 0; j < coords.length; ++j) {
        coords[j] = Math.round(coords[j] * ratio);
      }
    }
    return areamap;
  }

  showBuildDetail(item)  {
    this.httpService.getBuildingDetail(item.id,this.address=="hexi"?"100351":"10035")
      .subscribe(json => {
        if (json.success) {
          item.list = json.data;
          this.navCtrl.push('HospitalInNavDetailPage', {item: item})
        }
      })
  }
}
