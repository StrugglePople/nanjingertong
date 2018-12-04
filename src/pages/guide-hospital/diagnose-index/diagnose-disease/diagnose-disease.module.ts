import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiagnoseDiseasePage } from './diagnose-disease';

@NgModule({
  declarations: [
    DiagnoseDiseasePage,
  ],
  imports: [
    IonicPageModule.forChild(DiagnoseDiseasePage),
  ],
  exports: [
    DiagnoseDiseasePage
  ]
})
export class DiagnoseDiseasePageModule {}
