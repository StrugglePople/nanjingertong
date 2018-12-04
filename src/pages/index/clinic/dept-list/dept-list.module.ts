import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeptListPage } from './dept-list';

@NgModule({
  declarations: [
    DeptListPage,
  ],
  imports: [
    IonicPageModule.forChild(DeptListPage),
  ],
  exports: [
    DeptListPage
  ]
})
export class DeptListPageModule {}
