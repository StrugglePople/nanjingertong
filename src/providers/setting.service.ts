import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {AppConfig} from "../app/app.config";
import {Device} from "@ionic-native/device";
import {Platform} from "ionic-angular";

declare let ZkPlugin:any;

/*
  Generated class for the SettingService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
/**
 * 设置服务，放置一些系统性的请求
 */
@Injectable()
export class SettingService {

  constructor(public app: AppConfig, public httpService: HttpService, public device: Device,public platform: Platform) {

  }

  //应用初始方法，主要从原生代码中获取有用信息，可以在js里面写死
  init(callback) {
    if (this.device.cordova) {
      this.app.isInApp = true;
    }
    if (this.app.isInApp) {
      ZkPlugin.getVersionNumber((version)=>{
        this.app.version = version;
        this.dataInitWithLaunch();
        callback()
      })
      if(this.platform.is("ios")){
        ZkPlugin.initBaiduPush(this.app.mode,()=>{

        });

      }
    } else {
      // this.app.version = '3.0.2';
      this.dataInitWithLaunch();
      callback()
    }
  }

  initVersion() {

  }

  dataInitWithLaunch() {
    this.getCardTypes();
    this.getPaperTypes();
  }

  //获取卡类型列表
  getCardTypes() {
    this.httpService.getCardTypes();
  }

  //获取身份类型列表
  getPaperTypes () {
    this.httpService.getPaperTypes();
  }
}
