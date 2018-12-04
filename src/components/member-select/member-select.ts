import {Component, EventEmitter, Output,Input} from '@angular/core';
import {AccountService} from "../../providers/account.service";
import {ModalController} from "ionic-angular";
import {AppConfig} from "../../app/app.config";

/**
 * Generated class for the MemberSelectComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'member-select',
  templateUrl: 'member-select.html',
  providers: [AccountService]
})
export class MemberSelectComponent {

  @Output() selectMember: EventEmitter<any> = new EventEmitter();

  @Output() noMembers: EventEmitter<any> = new EventEmitter();

  @Input() type: string = 'title';
  text: string;

  member: any = {};

  constructor(public accountService: AccountService, public modalCtrl: ModalController, public app: AppConfig) {
    let member = this.accountService.getSelectMember();
    this.member = member;
    this.text = (member ? member.name: '选择就诊人') + '  ';
  }

  openModal() {
    if (!this.app.session.accounts || this.app.session.accounts.length == 0) {
      this.noMembers.emit();
      return;
    }
    let memberModal = this.modalCtrl.create('MemberSelectModalPage');
    memberModal.onDidDismiss(data => {
      if (!data) return;
      let newMember = data.member;
      if (this.member && this.member.id == newMember.id) return;
      this.member = newMember;
      this.text = this.member.name;
      this.selectMember.emit(this.member);
    });
    memberModal.present();
  }
}
