import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentRecordDetailPage } from './appointment-record-detail';
import {ModuleSeparateComponentModule} from "../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    AppointmentRecordDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AppointmentRecordDetailPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    AppointmentRecordDetailPage
  ]
})
export class AppointmentRecordDetailPageModule {}
