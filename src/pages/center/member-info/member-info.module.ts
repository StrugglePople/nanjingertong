import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberInfoPage } from './member-info';
import {ModuleSeparateComponentModule} from "../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    MemberInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberInfoPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    MemberInfoPage
  ]
})
export class MemberInfoModule {}
