import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiagnoseDiseaseDetailPage } from './diagnose-disease-detail';
import {ModuleSeparateComponentModule} from "../../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    DiagnoseDiseaseDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DiagnoseDiseaseDetailPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    DiagnoseDiseaseDetailPage
  ]
})
export class DiagnoseDiseaseDetailPageModule {}
