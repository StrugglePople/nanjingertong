import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ModuleSeparateComponentModule} from "../../../../components/module-separate/module-separate.module";
import {CardCharge} from "./card-charge";

@NgModule({
  declarations: [
    CardCharge
  ],
  imports: [
    IonicPageModule.forChild(CardCharge),
    ModuleSeparateComponentModule
  ],
  exports: [
    CardCharge
  ]
})
export class CardChargeModule {}
