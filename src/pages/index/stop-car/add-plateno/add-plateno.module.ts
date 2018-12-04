import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {EmptyViewComponentModule} from "../../../../components/empty-view/empty-view.module";
import {AddPlateno} from "./add-plateno";

@NgModule({
  declarations: [
    AddPlateno,
  ],
  imports: [
    IonicPageModule.forChild(AddPlateno),
    EmptyViewComponentModule
  ],
  exports: [
    AddPlateno
  ]
})
export class ParkingPayModule {}
