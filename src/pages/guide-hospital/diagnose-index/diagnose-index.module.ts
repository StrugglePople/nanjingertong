import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiagnoseIndexPage } from './diagnose-index';

@NgModule({
  declarations: [
    DiagnoseIndexPage,
  ],
  imports: [
    IonicPageModule.forChild(DiagnoseIndexPage),
  ],
  exports: [
    DiagnoseIndexPage
  ]
})
export class DiagnoseIndexPageModule {}
