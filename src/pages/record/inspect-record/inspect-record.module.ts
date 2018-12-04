import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspectRecordPage } from './inspect-record';
import {MemberSelectComponentModule} from "../../../components/member-select/member-select.module";
import {EmptyViewComponentModule} from "../../../components/empty-view/empty-view.module";

@NgModule({
  declarations: [
    InspectRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(InspectRecordPage),
    MemberSelectComponentModule,
    EmptyViewComponentModule
  ],
  exports: [
    InspectRecordPage
  ]
})
export class InspectRecordPageModule {}
