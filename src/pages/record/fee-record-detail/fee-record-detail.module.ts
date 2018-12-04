import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeeRecordDetailPage } from './fee-record-detail';
import {ModuleSeparateComponentModule} from "../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    FeeRecordDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FeeRecordDetailPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    FeeRecordDetailPage
  ]
})
export class FeeRecordDetailPageModule {}
