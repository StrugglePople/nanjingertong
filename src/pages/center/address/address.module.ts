import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressPage } from './address';
import {ModuleSeparateComponentModule} from "../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    AddressPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    AddressPage
  ]
})
export class AddressModule {}
