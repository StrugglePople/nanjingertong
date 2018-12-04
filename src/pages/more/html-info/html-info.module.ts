import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HtmlInfoPage } from './html-info';
import {PipesModule} from '../../../pipes/pipes.module';
@NgModule({
  declarations: [
    HtmlInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(HtmlInfoPage),
    PipesModule
  ],
  exports: [
    HtmlInfoPage
  ]
})
export class HtmlInfoModule {}
