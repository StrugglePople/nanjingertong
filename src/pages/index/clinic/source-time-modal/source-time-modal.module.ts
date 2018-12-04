import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ModuleSeparateComponentModule} from "../../../../components/module-separate/module-separate.module";
import {SourceTimeModal} from "./source-time-modal";

@NgModule({
  declarations: [
    SourceTimeModal,
  ],
  imports: [
    IonicPageModule.forChild(SourceTimeModal),
    ModuleSeparateComponentModule
  ],
  exports: [
    SourceTimeModal
  ]
})
export class SourceDetailModule {}
