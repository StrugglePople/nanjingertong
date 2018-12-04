import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardInfoPage } from './card-info';
import {ModuleSeparateComponentModule} from "../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    CardInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(CardInfoPage),
    ModuleSeparateComponentModule,
  ],
  exports: [
    CardInfoPage
  ]
})
export class CardInfoModule {}
