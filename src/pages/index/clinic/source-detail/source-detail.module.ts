import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ModuleSeparateComponentModule} from "../../../../components/module-separate/module-separate.module";
import {SourceDetail} from "./source-detail";
import {EmptyViewComponentModule} from "../../../../components/empty-view/empty-view.module";

@NgModule({
  declarations: [
    SourceDetail,
  ],
  imports: [
    IonicPageModule.forChild(SourceDetail),
    ModuleSeparateComponentModule,
    EmptyViewComponentModule
  ],
  exports: [
    SourceDetail
  ]
})
export class SourceDetailModule {}
