import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {EmptyViewComponentModule} from "../../../../components/empty-view/empty-view.module";
import {ParkingPayRecord} from "./parking-pay-record";

@NgModule({
  declarations: [
    ParkingPayRecord,
  ],
  imports: [
    IonicPageModule.forChild(ParkingPayRecord),
    EmptyViewComponentModule
  ],
  exports: [
    ParkingPayRecord
  ]
})
export class ParkingPayRecordModule {}
