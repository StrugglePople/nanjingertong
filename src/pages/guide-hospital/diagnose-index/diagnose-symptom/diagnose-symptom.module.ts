import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiagnoseSymptomPage } from './diagnose-symptom';
import {ModuleSeparateComponentModule} from "../../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    DiagnoseSymptomPage,
  ],
  imports: [
    IonicPageModule.forChild(DiagnoseSymptomPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    DiagnoseSymptomPage
  ]
})
export class DiagnoseSymptomPageModule {}
