import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeptInfoPage } from './dept-info';
import {ModuleSeparateComponentModule} from "../../../../components/module-separate/module-separate.module";
import {HeightEqualWidthDirective} from "../../../../components/height-equal-width/height-equal-width";

@NgModule({
  declarations: [
    DeptInfoPage,
    HeightEqualWidthDirective
  ],
  imports: [
    IonicPageModule.forChild(DeptInfoPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    DeptInfoPage
  ]
})
export class DeptInfoPageModule {}
