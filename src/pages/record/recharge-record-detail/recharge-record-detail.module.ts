import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RechargeRecordDetailPage } from './recharge-record-detail';
import {ModuleSeparateComponentModule} from "../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    RechargeRecordDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(RechargeRecordDetailPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    RechargeRecordDetailPage
  ]
})
export class RegRecordDetailPageModule {}
