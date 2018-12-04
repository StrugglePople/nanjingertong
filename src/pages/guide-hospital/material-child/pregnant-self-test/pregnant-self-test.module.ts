import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PregnantSelfTestPage } from './pregnant-self-test';
import {ModuleSeparateComponentModule} from "../../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    PregnantSelfTestPage,
  ],
  imports: [
    IonicPageModule.forChild(PregnantSelfTestPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    PregnantSelfTestPage
  ]
})
export class PregnantSelfTestPageModule {}
