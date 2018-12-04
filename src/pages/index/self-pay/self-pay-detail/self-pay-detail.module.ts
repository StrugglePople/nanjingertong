import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelfPayDetailPage } from './self-pay-detail';
import {ModuleSeparateComponentModule} from "../../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    SelfPayDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SelfPayDetailPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    SelfPayDetailPage
  ]
})
export class SelfPayDetailPageModule {}
