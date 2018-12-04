import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResetAccountPage } from './reset-account';
import {ModuleSeparateComponentModule} from "../../../components/module-separate/module-separate.module";
import {SecurityCodeComponentModule} from "../../../components/security-code/security-code.module";

@NgModule({
  declarations: [
    ResetAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(ResetAccountPage),
    ModuleSeparateComponentModule,
    SecurityCodeComponentModule
  ],
  exports: [
    ResetAccountPage
  ]
})
export class ResetAccountModule {}
