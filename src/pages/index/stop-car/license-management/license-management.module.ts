import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {EmptyViewComponentModule} from "../../../../components/empty-view/empty-view.module";
import {LicenseManagement} from "./license-management";

@NgModule({
  declarations: [
    LicenseManagement,
  ],
  imports: [
    IonicPageModule.forChild(LicenseManagement),
    EmptyViewComponentModule
  ],
  exports: [
    LicenseManagement
  ]
})
export class LicenseManagementModule {}
