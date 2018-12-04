import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuideHospitalPage } from './guide-hospital';
import {ModuleSeparateComponentModule} from "../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    GuideHospitalPage,
  ],
  imports: [
    IonicPageModule.forChild(GuideHospitalPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    GuideHospitalPage
  ]
})
export class GuideHospitalModule {}
