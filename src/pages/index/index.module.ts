/**
 * Created by Administrator on 2017/5/16 0016.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndexPage } from './index';
import {ModuleSeparateComponentModule} from "../../components/module-separate/module-separate.module";


@NgModule({
  declarations: [
    IndexPage
  ],
  imports: [
    IonicPageModule.forChild(IndexPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    IndexPage
  ]
})
export class IndexModule {}
