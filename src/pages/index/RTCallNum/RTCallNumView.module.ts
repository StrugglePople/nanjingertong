import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ModuleSeparateComponentModule} from "../../../components/module-separate/module-separate.module";
import {RTCallNumView} from "./RTCallNumView";
import {EmptyViewComponentModule} from "../../../components/empty-view/empty-view.module";

@NgModule({
  declarations: [
    RTCallNumView,
  ],
  imports: [
    IonicPageModule.forChild(RTCallNumView),
    ModuleSeparateComponentModule,
    EmptyViewComponentModule
  ],
  exports: [
    RTCallNumView
  ]
})
export class RTCallNumViewModule {}
