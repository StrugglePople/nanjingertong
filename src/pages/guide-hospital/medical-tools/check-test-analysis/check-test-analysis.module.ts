import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckTestAnalysisPage } from './check-test-analysis';

@NgModule({
  declarations: [
    CheckTestAnalysisPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckTestAnalysisPage),
  ],
  exports: [
    CheckTestAnalysisPage
  ]
})
export class CheckTestAnalysisModule {}
