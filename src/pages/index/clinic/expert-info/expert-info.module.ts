import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpertInfoPage } from './expert-info';
import {ModuleSeparateComponentModule} from "../../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    ExpertInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpertInfoPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    ExpertInfoPage
  ]
})
export class ExpertInfoPageModule {}
