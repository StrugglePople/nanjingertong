import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HospitalIntroductionPage } from './hospital-introduction';
import {PipesModule} from '../../../pipes/pipes.module';
@NgModule({
  declarations: [
    HospitalIntroductionPage,
  ],
  imports: [
    IonicPageModule.forChild(HospitalIntroductionPage),
    PipesModule
  ],
  exports: [
    HospitalIntroductionPage
  ]
})
export class HospitalIntroductionModule {}
