import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PregnantSetDatePage } from './pregnant-set-date';
import {ModuleSeparateComponentModule} from "../../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    PregnantSetDatePage,
  ],
  imports: [
    IonicPageModule.forChild(PregnantSetDatePage),
    ModuleSeparateComponentModule
  ],
  exports: [
    PregnantSetDatePage
  ]
})
export class PregnantSetDatePageModule {}
