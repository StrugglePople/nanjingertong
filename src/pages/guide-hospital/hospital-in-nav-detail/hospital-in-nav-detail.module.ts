import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HospitalInNavDetailPage } from './hospital-in-nav-detail';

@NgModule({
  declarations: [
    HospitalInNavDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HospitalInNavDetailPage),
  ],
  exports: [
    HospitalInNavDetailPage
  ]
})
export class HospitalInNavDetailPageModule {}
