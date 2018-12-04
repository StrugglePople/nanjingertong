import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {HospitalNewsDetail} from "./hospital-news-detail";
import {PipesModule} from '../../../pipes/pipes.module';
@NgModule({
  declarations: [
    HospitalNewsDetail,
  ],
  imports: [
    IonicPageModule.forChild(HospitalNewsDetail),
    PipesModule
  ],
  exports: [
    HospitalNewsDetail
  ]
})
export class HospitalNewsDetailModule {}
