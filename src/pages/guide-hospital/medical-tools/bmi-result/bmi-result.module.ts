import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BmiResultPage } from './bmi-result';
import {ModuleSeparateComponentModule} from "../../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    BmiResultPage,
  ],
  imports: [
    IonicPageModule.forChild(BmiResultPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    BmiResultPage
  ]
})
export class BmiResultModule {}
