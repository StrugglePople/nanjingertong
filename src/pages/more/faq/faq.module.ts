import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaqPage } from './faq';
import {EmptyViewComponentModule} from "../../../components/empty-view/empty-view.module";

@NgModule({
  declarations: [
    FaqPage,
  ],
  imports: [
    IonicPageModule.forChild(FaqPage),
    EmptyViewComponentModule
  ],
  exports: [
    FaqPage
  ]
})
export class FaqModule {}
