import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ModuleSeparateComponentModule} from "../../../../components/module-separate/module-separate.module";
import {VisitDetail} from "./visit-detail";

@NgModule({
  declarations: [
    VisitDetail,
  ],
  imports: [
    IonicPageModule.forChild(VisitDetail),
    ModuleSeparateComponentModule
  ],
  exports: [
    VisitDetail
  ]
})
export class VisitDetailModule {}
