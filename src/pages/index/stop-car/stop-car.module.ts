import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {StopCar} from "./stop-car";

@NgModule({
  declarations: [
    StopCar,
  ],
  imports: [
    IonicPageModule.forChild(StopCar),
  ],
  exports: [
    StopCar
  ]
})
export class StopCarModule {}
