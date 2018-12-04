import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedBackPage } from './feed-back';
import {ModuleSeparateComponentModule} from "../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    FeedBackPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedBackPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    FeedBackPage
  ]
})
export class FeedBackModule {}
