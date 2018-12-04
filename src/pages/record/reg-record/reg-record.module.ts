import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegRecordPage } from './reg-record';
import {MemberSelectComponentModule} from "../../../components/member-select/member-select.module";
import {EmptyViewComponentModule} from "../../../components/empty-view/empty-view.module";

@NgModule({
  declarations: [
    RegRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(RegRecordPage),
    MemberSelectComponentModule,
    EmptyViewComponentModule
  ],
  exports: [
    RegRecordPage
  ]
})
export class RegRecordPageModule {}
