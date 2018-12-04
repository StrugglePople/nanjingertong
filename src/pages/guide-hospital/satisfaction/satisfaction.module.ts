import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SatisfactionPage } from './satisfaction';
import {ModuleSeparateComponentModule} from "../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    SatisfactionPage,
  ],
  imports: [
    IonicPageModule.forChild(SatisfactionPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    SatisfactionPage
  ]
})
export class SatisfactionPageModule {}
