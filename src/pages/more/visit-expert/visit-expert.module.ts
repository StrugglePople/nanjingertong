import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ModuleSeparateComponentModule} from "../../../components/module-separate/module-separate.module";
import {VisitExpert} from "./visit-expert";

@NgModule({
  declarations: [
    VisitExpert,
  ],
  imports: [
    IonicPageModule.forChild(VisitExpert),
    ModuleSeparateComponentModule
  ],
  exports: [
    VisitExpert
  ]
})
export class VisitExpertModule {}
