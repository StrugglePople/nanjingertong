import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HospitalInNavDetail2Page } from './hospital-in-nav-detail2';

@NgModule({
  declarations: [
    HospitalInNavDetail2Page,
  ],
  imports: [
    IonicPageModule.forChild(HospitalInNavDetail2Page),
  ],
  exports: [
    HospitalInNavDetail2Page
  ]
})
export class HospitalInNavDetail2PageModule {}
