import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeptTreeListPage } from './dept-tree-list';

@NgModule({
  declarations: [
    DeptTreeListPage,
  ],
  imports: [
    IonicPageModule.forChild(DeptTreeListPage),
  ],
  exports: [
    DeptTreeListPage
  ]
})
export class DeptTreeListPageModule {}
