import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {EmptyViewComponentModule} from "../../../../components/empty-view/empty-view.module";
import {ParkingDistribution} from "./parking-distribution";

@NgModule({
  declarations: [
    ParkingDistribution,
  ],
  imports: [
    IonicPageModule.forChild(ParkingDistribution),
    EmptyViewComponentModule
  ],
  exports: [
    ParkingDistribution
  ]
})
export class ParkingDistributionModule {}
