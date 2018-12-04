import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BmiCalculatorPage } from './bmi-calculator';
import {ModuleSeparateComponentModule} from "../../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    BmiCalculatorPage
  ],
  imports: [
    IonicPageModule.forChild(BmiCalculatorPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    BmiCalculatorPage
  ]
})
export class BmiCalculatorModule {}
