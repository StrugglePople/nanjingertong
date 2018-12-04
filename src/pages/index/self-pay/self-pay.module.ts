import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelfPayPage } from './self-pay';
import {EmptyViewComponentModule} from "../../../components/empty-view/empty-view.module";
import {ModuleSeparateComponentModule} from "../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    SelfPayPage,
  ],
  imports: [
    IonicPageModule.forChild(SelfPayPage),
    EmptyViewComponentModule,
    ModuleSeparateComponentModule
  ],
  exports: [
    SelfPayPage
  ]
})
export class SelfPayPageModule {}
