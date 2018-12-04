import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ModuleSeparateComponentModule} from "../../../components/module-separate/module-separate.module";
import {MessageCenterDetailPage} from "./message-center-detail";
import {PipesModule} from "../../../pipes/pipes.module";

@NgModule({
  declarations: [
    MessageCenterDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageCenterDetailPage),
    ModuleSeparateComponentModule,
    PipesModule
  ],
  exports: [
    MessageCenterDetailPage
  ]
})
export class MessageCenterDetailModule {}
