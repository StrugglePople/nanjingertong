import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ModuleSeparateComponentModule} from "../../../components/module-separate/module-separate.module";
import {ChufangRecordDetail} from "./chufang-record-detail";

@NgModule({
  declarations: [
    ChufangRecordDetail,
  ],
  imports: [
    IonicPageModule.forChild(ChufangRecordDetail),
    ModuleSeparateComponentModule
  ],
  exports: [
    ChufangRecordDetail
  ]
})
export class ChufangRecordDetailModule {}
