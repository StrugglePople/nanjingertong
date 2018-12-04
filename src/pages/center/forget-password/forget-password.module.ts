import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgetPasswordPage } from './forget-password';
import {ModuleSeparateComponentModule} from "../../../components/module-separate/module-separate.module";
import {SecurityCodeComponentModule} from "../../../components/security-code/security-code.module";

@NgModule({
  declarations: [
    ForgetPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgetPasswordPage),
    ModuleSeparateComponentModule,
    SecurityCodeComponentModule
  ],
  exports: [
    ForgetPasswordPage
  ]
})
export class ForgetPasswordModule {}
