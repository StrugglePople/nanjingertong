import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HepatitisBSelfTestPage } from './hepatitis-b-self-test';
import {ModuleSeparateComponentModule} from "../../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    HepatitisBSelfTestPage,
  ],
  imports: [
    IonicPageModule.forChild(HepatitisBSelfTestPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    HepatitisBSelfTestPage
  ]
})
export class HepatitisBSelfTestModule {}
