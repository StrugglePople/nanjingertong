import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiagnoseTwoPartPage } from './diagnose-two-part';

@NgModule({
  declarations: [
    DiagnoseTwoPartPage,
  ],
  imports: [
    IonicPageModule.forChild(DiagnoseTwoPartPage),
  ],
  exports: [
    DiagnoseTwoPartPage
  ]
})
export class DiagnoseTwoPartPageModule {}
