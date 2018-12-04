import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {OutpatientPay} from "./outpatient-pay";
import {ModuleSeparateComponentModule} from "../../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    OutpatientPay,
  ],
  imports: [
    IonicPageModule.forChild(OutpatientPay),
    ModuleSeparateComponentModule
  ],
  exports: [
    OutpatientPay
  ]
})
export class OutpatientPayModule {}
