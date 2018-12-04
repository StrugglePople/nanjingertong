import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {HospitalNews} from "./hospital-news";
import {PipesModule} from '../../../pipes/pipes.module';
@NgModule({
  declarations: [
    HospitalNews,
  ],
  imports: [
    IonicPageModule.forChild(HospitalNews),
    PipesModule
  ],
  exports: [
    HospitalNews
  ]
})
export class HospitalNewsModule {}
