import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduleListModalPage } from './schedule-list-modal';

@NgModule({
  declarations: [
    ScheduleListModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ScheduleListModalPage),
  ],
  exports: [
    ScheduleListModalPage
  ]
})
export class ScheduleListModalPageModule {}
