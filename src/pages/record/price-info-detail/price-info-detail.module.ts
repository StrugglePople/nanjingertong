import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {PriceInfoDetail} from "./price-info-detail";

@NgModule({
  declarations: [
    PriceInfoDetail,
  ],
  imports: [
    IonicPageModule.forChild(PriceInfoDetail),
  ],
  exports: [
    PriceInfoDetail
  ]
})
export class PriceInfoDetailModule {}
