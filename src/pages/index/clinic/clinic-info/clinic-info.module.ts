import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClinicInfoPage } from './clinic-info';
import {ModuleSeparateComponentModule} from "../../../../components/module-separate/module-separate.module";

@NgModule({
  declarations: [
    ClinicInfoPage
  ],
  imports: [
    IonicPageModule.forChild(ClinicInfoPage),
    ModuleSeparateComponentModule
  ],
  exports: [
    ClinicInfoPage
  ]
})
export class ClinicInfoPageModule {}
