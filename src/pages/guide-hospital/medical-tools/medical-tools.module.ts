import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicalToolsPage } from './medical-tools';
import {ModuleSeparateComponentModule} from "../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    MedicalToolsPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicalToolsPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    MedicalToolsPage
  ]
})
export class KnowledgeRepositoryModule {}
