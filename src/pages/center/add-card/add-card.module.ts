import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCardPage } from './add-card';
import {ModuleSeparateComponentModule} from "../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    AddCardPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCardPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    AddCardPage
  ]
})
export class AddCardModule {}
