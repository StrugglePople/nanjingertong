import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyAttentionPage } from './my-attention';
import {EmptyViewComponentModule} from "../../../components/empty-view/empty-view.module";

@NgModule({
  declarations: [
    MyAttentionPage,
  ],
  imports: [
    IonicPageModule.forChild(MyAttentionPage),
    EmptyViewComponentModule
  ],
  exports: [
    MyAttentionPage
  ]
})
export class MyAttentionPageModule {}
