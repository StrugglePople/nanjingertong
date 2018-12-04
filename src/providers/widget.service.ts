/**
 * Created by Administrator on 2017/5/14 0014.
 */
import { Injectable } from '@angular/core';
import {ToastController, Toast, AlertController, LoadingController, Loading} from 'ionic-angular';


/*
 Generated class for the WidgetService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
/**
 * 一些弹出的服务
 */
@Injectable()
export class WidgetService {

  private toastE: Loading;

  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, private loadingCtrl: LoadingController) {

  }

  /**
   * 展示信息，过时间隐藏
   * @param message 信息主体
   * @param callback 箭头函数回调
   * @param time 显示的时间
   * @returns {Toast}
   */
  public toast(message, callback?: (data: any, role: string) => void, time?: number): Loading {
    if (this.toastE) {
      this.toastE.dismissAll();
    }
    this.toastE = this.loadingCtrl.create({
      spinner: 'hide',
      content: message,
      duration: time ? time : 2000,
      dismissOnPageChange: true
    });
    if (callback) {
      this.toastE.onDidDismiss(callback);
    }
    this.toastE.present();
    return this.toastE;
  }

  /**
   * alert
   * @param message 消息主体
   * @param callback
   * @param title 消息抬头
   * @param buttonName 按钮名字
   * @returns {Alert}
   */
  public alert(message,  callback?: (value: any) => boolean | void, title?: string, buttonName?: string,enableBackdropDismiss?:boolean,className?) {
    let alert = this.alertCtrl.create({
      title: title ? title : '提示',
      message: message,
      cssClass:className?className:'',
      buttons: [
        {
          text: buttonName ? buttonName : '确定',
          handler: callback
        }
      ],
      enableBackdropDismiss : enableBackdropDismiss?false:true
    });
    alert.present();
    return alert;
  }

  /**
   * confirm
   * @param message 消息主体
   * @param callback 箭头回调函数
   * @param title 消息抬头
   * @param sureName 确定按钮的名字
   * @param cancelName 取消按钮的名字
   * @returns {Alert}
   */
  public confirm(message, callback?: (value: any) => boolean | void, title?: string, sureName?: string, cancelName?: string,cancelBack?: (value: any) => boolean | void,cssName?) {
    let confirm = this.alertCtrl.create({
      title: title ? title : '提示',
      message: message,
      cssClass:cssName ? cssName:'',
      buttons: [
        {
          text: cancelName ? cancelName : '取消',
          handler:cancelBack
        },
        {
          text: sureName ? sureName : '确定',
          handler: callback
        }
      ]
    });
    confirm.present();
    return confirm;
  }
}
