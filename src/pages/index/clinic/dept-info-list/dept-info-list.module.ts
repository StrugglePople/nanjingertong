import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {DeptInfoListPage} from "./dept-info-list";

@NgModule({
  declarations: [
    DeptInfoListPage,
  ],
  imports: [
    IonicPageModule.forChild(DeptInfoListPage),
  ],
  exports: [
    DeptInfoListPage
  ]
})
export class DeptListPageModule {}
