import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HospitalFlashPage } from './hospital-flash';

@NgModule({
  declarations: [
    HospitalFlashPage,
  ],
  imports: [
    IonicPageModule.forChild(HospitalFlashPage),
  ],
  exports: [
    HospitalFlashPage
  ]
})
export class HospitalFlashModule {}
