import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberSelectModalPage } from './member-select-modal';

@NgModule({
  declarations: [
    MemberSelectModalPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberSelectModalPage),
  ],
  exports: [
    MemberSelectModalPage
  ]
})
export class MemberSelectModalPageModule {}
