import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {PriceInfoSub} from "./price-info-sub";

@NgModule({
  declarations: [
    PriceInfoSub,
  ],
  imports: [
    IonicPageModule.forChild(PriceInfoSub),
  ],
  exports: [
    PriceInfoSub
  ]
})
export class PriceInfoSubModule {}
