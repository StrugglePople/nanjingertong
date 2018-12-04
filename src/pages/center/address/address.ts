import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Select} from 'ionic-angular';
import {CacheService} from "../../../providers/cache.service";
import {HttpService} from "../../../providers/http.service";
import {WidgetService} from "../../../providers/widget.service";

/**
 * Generated class for the Address page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage{

  @ViewChild('sel') sel: Select;
  member:any;
  address = {
    address0: {},
    address1: {},
    address2: {},
    address3: {},
    address4: {}
  };
  addressTypes:any = {
    type0:['provinceCode','provinceName'],
    type1:['cityCode','cityName','pCode'],
    type2:['areaCode','areaName','sCode'],
    type3:['streetCode','streetName','qCode']
  };
  addressType:any;
  items = [];

  index;

  constructor(public cacheService: CacheService, public httpService: HttpService, public widgetService: WidgetService,
              public navCtrl: NavController, public navParams: NavParams) {
    this.member = { ...this.navParams.data };
    if(this.member.address && this.member.shengCode){
      this.initAddress();
    }
    this.addressType = this.addressTypes.type0;
  }
  initAddress(){
    this.address = {
      address0: {
        provinceCode:this.member.shengCode,
        provinceName:this.member.shengName
      },
      address1: {
        cityCode:this.member.shiCode,
        cityName:this.member.shiName
      },
      address2: {
        areaCode:this.member.quCode,
        areaName:this.member.quName
      },
      address3: {
        streetCode:this.member.zhenCode,
        streetName:this.member.zhenName
      },
      address4: {
        addressCode:'',
        address:this.member.address.split(this.member.zhenName)[1]
      }
    };

  }
  open(index) {

    this.index = index;

    let parentCode = '',parentType='',requestType='';
    this.addressType = this.addressTypes['type'+index];
    parentType = this.addressType[0];
    if (index > 0) {
      requestType = this.addressType[2];
      parentCode = this.address['address' + (index - 1)][this.addressTypes['type'+(index - 1)][0]];
      this.clearLevalData(index);
    }
    this.httpService.getAddress(parentType,parentCode,requestType)
      .subscribe(json => {
        if (json.success) {
          this.items = json.data;
          setTimeout(() => {
            this.sel.open();
          }, 50);
        }
      });
  };

  select(val) {
    this.address['address' + this.index] = val;
    for (let i = 0; i < 5; i++) {
      if (i > this.index) {
        this.address['address' + i] = {};
      }
    }
  }

  clearLevalData(index) {
    for (let i = 0; i < 5; i++) {
      if (i > index - 1) {
        this.address['address' + i] = {};
      }
    }
  }

  save() {
    if (!this.address.address4['address']) {
      this.widgetService.toast('请选择或者填写完选项!');
      return;
    }
    // let string = '';
    /*for (let i = 0; i < 5; i++) {
      // string += this.address['address' + i].address;
      if (i == 4) {
        this.address['address' + i].code = -1;
        string += this.address['address' + i].code + ':' + this.address['address' + i].address;
      } else {
        string += this.address['address' + i].code + ':' + this.address['address' + i].address + '+';
      }
    }*/
    this.cacheService.set('address', this.address);
    this.navCtrl.pop();
  }
}
