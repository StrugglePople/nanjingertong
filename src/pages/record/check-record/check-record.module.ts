import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckRecordPage } from './check-record';
import {MemberSelectComponentModule} from "../../../components/member-select/member-select.module";
import {EmptyViewComponentModule} from "../../../components/empty-view/empty-view.module";

@NgModule({
  declarations: [
    CheckRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckRecordPage),
    MemberSelectComponentModule,
    EmptyViewComponentModule
  ],
  exports: [
    CheckRecordPage
  ]
})
export class CheckRecordPageModule {}
