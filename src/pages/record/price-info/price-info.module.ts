import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {PriceInfo} from "./price-info";

@NgModule({
  declarations: [
    PriceInfo,
  ],
  imports: [
    IonicPageModule.forChild(PriceInfo)
  ],
  exports: [
    PriceInfo
  ]
})
export class PriceInfoModule {}
