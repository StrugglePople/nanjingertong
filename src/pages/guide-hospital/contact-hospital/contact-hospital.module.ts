import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactHospitalPage } from './contact-hospital';
import {ModuleSeparateComponentModule} from "../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    ContactHospitalPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactHospitalPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    ContactHospitalPage
  ]
})
export class ContactHospitalModule {}
