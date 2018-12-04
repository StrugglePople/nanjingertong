import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {EmptyViewComponentModule} from "../../../../components/empty-view/empty-view.module";
import {ParkingPay} from "./parking-pay";

@NgModule({
  declarations: [
    ParkingPay,
  ],
  imports: [
    IonicPageModule.forChild(ParkingPay),
    EmptyViewComponentModule
  ],
  exports: [
    ParkingPay
  ]
})
export class ParkingPayModule {}
