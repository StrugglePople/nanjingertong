import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpertListPage } from './expert-list';
import {EmptyViewComponentModule} from "../../../../components/empty-view/empty-view.module";

@NgModule({
  declarations: [
    ExpertListPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpertListPage),
    EmptyViewComponentModule
  ],
  exports: [
    ExpertListPage
  ]
})
export class ExpertListPageModule {}
