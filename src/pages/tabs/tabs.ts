import { Component, ViewChild} from '@angular/core';
import {Events, IonicPage, NavController, Platform, Tabs} from 'ionic-angular'
import {BackButtonService} from "../../providers/backButton.service";
import {WidgetService} from "../../providers/widget.service";
import {HttpService} from "../../providers/http.service";
import {CacheService} from "../../providers/cache.service";
import {AppConfig} from "../../app/app.config";
declare let ZkPlugin:any;
@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('mainTabs') tabRef: Tabs;

  tab1Root = 'IndexPage';
  tab2Root = 'GuideHospitalPage';
  tab3Root = 'RecordPage';
  tab4Root = 'CenterPage';

  messageNum = 0;

  constructor(public event:Events, public backButtonService: BackButtonService, private platform: Platform, public app: AppConfig,public widgetService: WidgetService,
              public httpService: HttpService,public cacheService: CacheService,public navCtrl: NavController) {
    //获取消息数字更新
    /*this.event.subscribe('message.num',(data)=> {
      this.messageNum = data;
    });*/
    /*platform.ready().then(() => {
      if (this.platform.is('android')) {
        this.backButtonService.registerBackButtonAction(this.tabRef);
      }
    });*/
    this.loadNote();
    this.keepAlive();

  }

  loadNote() {
    this.httpService.loadRollingLast()
      .subscribe(json => {
        if (json.success) {
          if(json.resultData.validFlag != 'ENABLE'){
            return;
          }
          let note = this.cacheService.get('note.publishTime');
          if(!note || note-0 < json.resultData.publishTime-0){
            this.cacheService.set('note.publishTime',json.resultData.publishTime);
            this.showNote(json.resultData);
          }else{
            let notShow = this.cacheService.get('note.notShow');
            if(!notShow){
              this.showNote(json.resultData);
            }
          }

        }
      });
  }
  keepAlive(){
    setTimeout(()=>{
      if (this.app.isInApp) {
        ZkPlugin.keepAlive((o) => {
          if (o.type == 'baiduPush') {
            if (!this.app.session) {
              this.navCtrl.push('LoginPage');
            }else{
              this.navCtrl.push("MessageCenter");
            }
          }else if (o.type == 'baiduPushActive') {
            this.widgetService.confirm(o.detail, () => {
              if (!this.app.session) {
                this.navCtrl.push('LoginPage');
              }else{
                this.navCtrl.push("MessageCenter");
              }
            },null,'去消息中心查看',);
          }
        })
      }
    },1500);
  }

  /*showNote(note) {
    let alert = this.widgetService.alert(note.content, (data)=> {
      this.cacheService.set('note.notShow', data[0] ? data[0] : false);
    }, note.title,null,null,'loadNote');
    alert.addInput({
      type: 'checkbox',
      label: '不再显示',
      value: 'true',
      checked: false
    });
  }*/
  showNote(note) {
    let alert = this.widgetService.confirm(note.content, (data)=> {
      this.cacheService.set('note.notShow', false);
    }, note.title,null,'不再显示',(data)=> {
      this.cacheService.set('note.notShow', true);
    },'text-left');

  }
}
