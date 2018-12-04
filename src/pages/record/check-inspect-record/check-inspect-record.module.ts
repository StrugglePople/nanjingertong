import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {CheckInspectRecord} from "./check-inspect-record";

@NgModule({
  declarations: [
    CheckInspectRecord,
  ],
  imports: [
    IonicPageModule.forChild(CheckInspectRecord),
  ],
  exports: [
    CheckInspectRecord
  ]
})
export class CheckInspectRecordModule {}
