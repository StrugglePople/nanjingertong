import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthInformationPage } from './health-information';
import {EmptyViewComponentModule} from "../../../components/empty-view/empty-view.module";

@NgModule({
  declarations: [
    HealthInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthInformationPage),
    EmptyViewComponentModule
  ],
  exports: [
    HealthInformationPage
  ]
})
export class HealthInformationModule {}
