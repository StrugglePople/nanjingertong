import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpertSchedulePage } from './expert-schedule';
import {ModuleSeparateComponentModule} from "../../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    ExpertSchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(ExpertSchedulePage),
    ModuleSeparateComponentModule
  ],
  exports: [
    ExpertSchedulePage
  ]
})
export class ExpertSchedulePageModule {}
