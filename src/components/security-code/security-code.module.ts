import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecurityCodeComponent } from './security-code';

@NgModule({
  declarations: [
    SecurityCodeComponent,
  ],
  imports: [
    IonicPageModule.forChild(SecurityCodeComponent),
  ],
  exports: [
    SecurityCodeComponent
  ]
})
export class SecurityCodeComponentModule {}
