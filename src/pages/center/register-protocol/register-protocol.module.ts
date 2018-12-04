import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterProtocolPage } from './register-protocol';
import {PipesModule} from '../../../pipes/pipes.module';
@NgModule({
  declarations: [
    RegisterProtocolPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterProtocolPage),
    PipesModule
  ],
  exports: [
    RegisterProtocolPage
  ]
})
export class RegisterProtocolPageModule {}
