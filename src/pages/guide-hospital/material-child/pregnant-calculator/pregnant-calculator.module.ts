import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PregnantCalculatorPage } from './pregnant-calculator';

@NgModule({
  declarations: [
    PregnantCalculatorPage,
  ],
  imports: [
    IonicPageModule.forChild(PregnantCalculatorPage),
  ],
  exports: [
    PregnantCalculatorPage
  ]
})
export class PregnantCalculatorPageModule {}
