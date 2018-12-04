import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthInformationDetailPage } from './health-information-detail';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    HealthInformationDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthInformationDetailPage),
    PipesModule
  ],
  exports: [
    HealthInformationDetailPage
  ]
})
export class HealthInformationDetailModule {}
