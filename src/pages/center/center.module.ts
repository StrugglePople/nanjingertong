/**
 * Created by Administrator on 2017/5/16 0016.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CenterPage } from './center';
import {ModuleSeparateComponentModule} from "../../components/module-separate/module-separate.module";


@NgModule({
  declarations: [
    CenterPage
  ],
  imports: [
    IonicPageModule.forChild(CenterPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    CenterPage
  ]
})
export class IndexModule {}
