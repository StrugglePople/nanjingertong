import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpService} from "../../../providers/http.service";
import {WidgetService} from "../../../providers/widget.service";
import {AppConfig} from "../../../app/app.config";
import {AccountService} from "../../../providers/account.service";
import {BasePage} from "../../../app/base";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the SatisfactionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-satisfaction',
  templateUrl: 'satisfaction.html',
})
export class SatisfactionPage extends BasePage{

  questions = [];
  remark = '';
  item;
  topicId;
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpService,
              public widgetService: WidgetService, public app: AppConfig, public accountService: AccountService,
              public nativePageTransitions: NativePageTransitions) {
    super(navCtrl, navParams, nativePageTransitions);
    this.item = this.navParams.data.item;
  }

  ionViewDidLoad() {
    this.httpService.surveyTopic()
      .subscribe(json => {
        if (json.success) {
          this.topicId = json.data[0].id;
          this.httpService.survey(json.data[0].id)
            .subscribe(json1 => {
              if (json1.success) {
                this.questions = json1.data;
              }
            })
        }
      })
  }

  chooseOption(question, option) {
    let arrive = false;
    for (let i = 0; i < question.option.length; i++) {
      question.option[i].current = false;
      question.option[i].select = !arrive;

      if (option.id == question.option[i].id) {
        arrive = true;
      }
    }
    option.current = true;

  }

  clear() {
    for (let question of this.questions) {
      for (let option of question.option) {
        option.current = false;
        option.select = false;
      }
    }
    this.remark = '';
  }

  confirm() {
    for (let question of this.questions) {
      if(!question.option[0].select) {
        this.widgetService.toast('您还有调查题目未完成，请完成！');
        return;
      }
    }
    this.widgetService.confirm('确认提交？', ()=> {
      let answer = '';
      for (let question of this.questions) {
        for (let option of question.option) {
          if (option.current) {
            answer += question.id + ':' + option.id;
          }
        }
        answer += ';'
      }

      answer = answer.substr(0, answer.length - 1);
      let data = {
        answer: answer,
        remark: this.remark,
        visitDoctorId: this.item.medID,
        expertId: this.item.doctorId,
        deptId: this.item.deptId,
        accountIdStr: this.app.session.id,
        patientIdStr: this.accountService.getSelectMember().aesId,
        cardNo: this.item.cardNo,
        companyId: this.app.hospitalId,
        subjectId: this.topicId,
        visitDoctorMedId: this.item.medID
      };
      this.httpService.answer(data)
        .subscribe(json => {
          if (json.success) {
            this.item.surveyId = 2;
            this.widgetService.toast(json.errMsg, ()=> {
              this.navCtrl.pop();
            })
          }
        })
    })

  }
}
