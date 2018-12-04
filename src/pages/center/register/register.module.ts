import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import {ModuleSeparateComponentModule} from "../../../components/module-separate/module-separate.module";
import {SecurityCodeComponentModule} from "../../../components/security-code/security-code.module";

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
    ModuleSeparateComponentModule,
    SecurityCodeComponentModule
  ],
  exports: [
    RegisterPage
  ]
})
export class RegisterPageModule {}
