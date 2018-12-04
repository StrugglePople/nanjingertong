import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {EmptyViewComponentModule} from "../../../../components/empty-view/empty-view.module";
import {ProvinceModel} from "./province-model";

@NgModule({
  declarations: [
    ProvinceModel,
  ],
  imports: [
    IonicPageModule.forChild(ProvinceModel),
    EmptyViewComponentModule
  ],
  exports: [
    ProvinceModel
  ]
})
export class ProvinceModelModule {}
