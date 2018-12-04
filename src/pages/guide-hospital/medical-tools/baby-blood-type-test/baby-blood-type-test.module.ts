import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BabyBloodTypeTestPage } from './baby-blood-type-test';

@NgModule({
  declarations: [
    BabyBloodTypeTestPage,
  ],
  imports: [
    IonicPageModule.forChild(BabyBloodTypeTestPage),
  ],
  exports: [
    BabyBloodTypeTestPage
  ]
})
export class BabyBloodTypeTestModule {}
