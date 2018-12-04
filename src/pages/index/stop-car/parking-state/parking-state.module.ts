import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ParkingState} from "./parking-state";
import {EmptyViewComponentModule} from "../../../../components/empty-view/empty-view.module";

@NgModule({
  declarations: [
    ParkingState,
  ],
  imports: [
    IonicPageModule.forChild(ParkingState),
    EmptyViewComponentModule
  ],
  exports: [
    ParkingState
  ]
})
export class ParkingStateModule {}
