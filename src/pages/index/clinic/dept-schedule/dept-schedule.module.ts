import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeptSchedulePage } from './dept-schedule';
import {ModuleSeparateComponentModule} from "../../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    DeptSchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(DeptSchedulePage),
    ModuleSeparateComponentModule
  ],
  exports: [
    DeptSchedulePage
  ]
})
export class DeptSchedulePageModule {}
