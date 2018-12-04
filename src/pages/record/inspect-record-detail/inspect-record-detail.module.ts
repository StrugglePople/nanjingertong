import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspectRecordDetailPage } from './inspect-record-detail';
import {ModuleSeparateComponentModule} from "../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    InspectRecordDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(InspectRecordDetailPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    InspectRecordDetailPage
  ]
})
export class InspectRecordDetailPageModule {}
