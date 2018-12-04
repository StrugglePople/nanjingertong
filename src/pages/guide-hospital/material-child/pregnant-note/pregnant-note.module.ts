import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PregnantNotePage } from './pregnant-note';
import {ModuleSeparateComponentModule} from "../../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    PregnantNotePage,
  ],
  imports: [
    IonicPageModule.forChild(PregnantNotePage),
    ModuleSeparateComponentModule
  ],
  exports: [
    PregnantNotePage
  ]
})
export class PregnantNotePageModule {}
