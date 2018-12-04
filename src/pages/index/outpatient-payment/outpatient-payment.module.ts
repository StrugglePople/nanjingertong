import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {OutpatientPayment} from "./outpatient-payment";
import {ModuleSeparateComponentModule} from "../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    OutpatientPayment,
  ],
  imports: [
    IonicPageModule.forChild(OutpatientPayment),
    ModuleSeparateComponentModule
  ],
  exports: [
    OutpatientPayment
  ]
})
export class MessageCenterModule {}
