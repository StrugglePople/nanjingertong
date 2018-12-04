/**
 * Created by Administrator on 2017/5/16 0016.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagePage } from './message';
import { ModuleSeparateComponentModule } from "../../components/module-separate/module-separate.module";


@NgModule({
  declarations: [
    MessagePage
  ],
  imports: [
    IonicPageModule.forChild(MessagePage),
    ModuleSeparateComponentModule
  ],
  exports: [
    MessagePage
  ]
})
export class MessageModule {}
