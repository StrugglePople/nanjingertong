import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentRecordPage } from './appointment-record';
import {MemberSelectComponentModule} from "../../../components/member-select/member-select.module";
import {EmptyViewComponentModule} from "../../../components/empty-view/empty-view.module";

@NgModule({
  declarations: [
    AppointmentRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(AppointmentRecordPage),
    MemberSelectComponentModule,
    EmptyViewComponentModule
  ],
  exports: [
    AppointmentRecordPage
  ]
})
export class AppointmentRecordModule {}
