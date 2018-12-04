import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PregnantHealthPage } from './pregnant-health';

@NgModule({
  declarations: [
    PregnantHealthPage,
  ],
  imports: [
    IonicPageModule.forChild(PregnantHealthPage),
  ],
  exports: [
    PregnantHealthPage
  ]
})
export class PregnantHealthPageModule {}
