import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeeRecordPage } from './fee-record';
import {MemberSelectComponentModule} from "../../../components/member-select/member-select.module";
import {EmptyViewComponentModule} from "../../../components/empty-view/empty-view.module";

@NgModule({
  declarations: [
    FeeRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(FeeRecordPage),
    MemberSelectComponentModule,
    EmptyViewComponentModule
  ],
  exports: [
    FeeRecordPage
  ]
})
export class FeeRecordPageModule {}
