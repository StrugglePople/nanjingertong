/**
 * Created by Administrator on 2017/5/16 0016.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecordPage } from './record';
import {ModuleSeparateComponentModule} from "../../components/module-separate/module-separate.module";


@NgModule({
  declarations: [
    RecordPage
  ],
  imports: [
    IonicPageModule.forChild(RecordPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    RecordPage
  ]
})
export class IndexModule {}
