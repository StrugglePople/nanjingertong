import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckRecordDetailPage } from './check-record-detail';
import {ModuleSeparateComponentModule} from "../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    CheckRecordDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckRecordDetailPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    CheckRecordDetailPage
  ]
})
export class CheckRecordDetailPageModule {}
