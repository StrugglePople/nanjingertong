import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HospitalInNavPage } from './hospital-in-nav';

@NgModule({
  declarations: [
    HospitalInNavPage,
  ],
  imports: [
    IonicPageModule.forChild(HospitalInNavPage),
  ],
  exports: [
    HospitalInNavPage
  ]
})
export class HospitalInNavPageModule {}
