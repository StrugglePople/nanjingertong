import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckTestAnalysisDetailPage } from './check-test-analysis-detail';
import {PipesModule} from '../../../../pipes/pipes.module';
@NgModule({
  declarations: [
    CheckTestAnalysisDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckTestAnalysisDetailPage),
    PipesModule
  ],
  exports: [
    CheckTestAnalysisDetailPage
  ]
})
export class CheckTestAnalysisDetailModule {}
