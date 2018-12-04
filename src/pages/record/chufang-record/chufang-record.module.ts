import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {MemberSelectComponentModule} from "../../../components/member-select/member-select.module";
import {EmptyViewComponentModule} from "../../../components/empty-view/empty-view.module";
import {ChufangRecord} from "./chufang-record";

@NgModule({
  declarations: [
    ChufangRecord,
  ],
  imports: [
    IonicPageModule.forChild(ChufangRecord),
    MemberSelectComponentModule,
    EmptyViewComponentModule
  ],
  exports: [
    ChufangRecord
  ]
})
export class ChufangRecordModule {}
