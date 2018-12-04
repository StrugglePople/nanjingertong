import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ModuleSeparateComponentModule} from "../../../../components/module-separate/module-separate.module";
import {OutpatientPayDetail} from "./outpatient-pay-detail";

@NgModule({
  declarations: [
    OutpatientPayDetail,
  ],
  imports: [
    IonicPageModule.forChild(OutpatientPayDetail),
    ModuleSeparateComponentModule
  ],
  exports: [
    OutpatientPayDetail
  ]
})
export class OutpatientPayDetailModule {}
