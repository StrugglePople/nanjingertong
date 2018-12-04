import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberListPage } from './member-list';
import {ModuleSeparateComponentModule} from "../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    MemberListPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberListPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    MemberListPage
  ]
})
export class MemberListModule {}
