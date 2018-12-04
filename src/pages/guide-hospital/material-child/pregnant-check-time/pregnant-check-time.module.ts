import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PregnantCheckTimePage } from './pregnant-check-time';
import {ModuleSeparateComponentModule} from "../../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    PregnantCheckTimePage,
  ],
  imports: [
    IonicPageModule.forChild(PregnantCheckTimePage),
    ModuleSeparateComponentModule
  ],
  exports: [
    PregnantCheckTimePage
  ]
})
export class PregnantCheckTimePageModule {}
