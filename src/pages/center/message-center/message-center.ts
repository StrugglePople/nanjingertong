import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams,} from 'ionic-angular';
import {BasePage} from "../../../app/base";
import {HttpService} from "../../../providers/http.service";
import {WidgetService} from "../../../providers/widget.service";
import {CacheService} from "../../../providers/cache.service";
import {AppConfig} from "../../../app/app.config";
import {AccountService} from "../../../providers/account.service";

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-message-center',
  templateUrl: 'message-center.html'
})
export class MessageCenter extends BasePage {


  hasMore:boolean = true;
  pageIndex=1;
  messages:any[] =[];

  constructor(public httpService: HttpService, public widgetService: WidgetService,public cacheService: CacheService,
              public navCtrl: NavController, public app: AppConfig, public accountService: AccountService,
              public navParams: NavParams) {
    super(navCtrl, navParams);
    this.getMessages();
  }

  ionViewWillEnter() {


  }
  getMessages(){
    let data = {
      accountIdStr:this.app.session.id,
      notificationMessageType:'USER_NOTIFICATION',
      pageSize:10,
      pageIndex:this.pageIndex
    };
    this.httpService.getMessages(data)
      .subscribe(json => {
        if (json.success) {
          this.pageIndex++;
          this.messages = this.messages.concat(json.data);
          if(json.data.length < 10){
            this.hasMore = false;
          }
        }
      })
  }
  showMessgaDetail(message){
    if(message.readOrNot == 'NO'){
      this.httpService.readMessage(message.aesId)
        .subscribe(json => {
          if (json.success) {
            message.readOrNot = 'YES';
            this.navCtrl.push('MessageCenterDetailPage',message);
          }
        })
    }else{
      this.navCtrl.push('MessageCenterDetailPage',message);
    }

  }
  deleteMessageFromList(aesId){

    this.widgetService.confirm('确认删除？',()=>{
      this.httpService.deleteMessage(aesId)
        .subscribe(json => {
          if (json.success) {
            for(let i=0;i<this.messages.length;i++){
              if (aesId === this.messages[i].aesId) {
                this.messages.splice(i, 1);
                break;
              }
            }


          }
        })

    });


  }
}
