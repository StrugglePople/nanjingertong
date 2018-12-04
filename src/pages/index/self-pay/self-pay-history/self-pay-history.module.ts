import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelfPayHistoryPage } from './self-pay-history';
import {EmptyViewComponentModule} from "../../../../components/empty-view/empty-view.module";
import {ModuleResolutionHostAdapter} from "@angular/compiler-cli";
import {ModuleSeparateComponentModule} from "../../../../components/module-separate/module-separate.module";
import {MemberSelectComponentModule} from "../../../../components/member-select/member-select.module";

@NgModule({
  declarations: [
    SelfPayHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(SelfPayHistoryPage),
    EmptyViewComponentModule,
    MemberSelectComponentModule,
    ModuleSeparateComponentModule
  ],
  exports: [
    SelfPayHistoryPage
  ]
})
export class SelfPayHistoryPageModule {}
