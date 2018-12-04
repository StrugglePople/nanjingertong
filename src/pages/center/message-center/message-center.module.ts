import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {MessageCenter} from "./message-center";
import {ModuleSeparateComponentModule} from "../../../components/module-separate/module-separate.module";
import {EmptyViewComponentModule} from "../../../components/empty-view/empty-view.module";

@NgModule({
  declarations: [
    MessageCenter,
  ],
  imports: [
    IonicPageModule.forChild(MessageCenter),
    ModuleSeparateComponentModule,
    EmptyViewComponentModule
  ],
  exports: [
    MessageCenter
  ]
})
export class MessageCenterModule {}
