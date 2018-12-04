import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RrechargeRecordPage } from './recharge-record';
import {EmptyViewComponentModule} from "../../../components/empty-view/empty-view.module";
import {ModuleSeparateComponentModule} from "../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    RrechargeRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(RrechargeRecordPage),
    EmptyViewComponentModule,
    ModuleSeparateComponentModule
  ],
  exports: [
    RrechargeRecordPage
  ]
})
export class RrechargeRecordModule {}
