import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaySelectWayPage } from './pay-select-way';
import {ModuleSeparateComponentModule} from "../../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    PaySelectWayPage,
  ],
  imports: [
    IonicPageModule.forChild(PaySelectWayPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    PaySelectWayPage
  ]
})
export class PaySelectWayPageModule {}
