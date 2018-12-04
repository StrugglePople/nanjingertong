import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiagnoseSelectedSymptomPage } from './diagnose-selected-symptom';
import {ModuleSeparateComponentModule} from "../../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    DiagnoseSelectedSymptomPage,
  ],
  imports: [
    IonicPageModule.forChild(DiagnoseSelectedSymptomPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    DiagnoseSelectedSymptomPage
  ]
})
export class DiagnoseSelectedSymptomPageModule {}
