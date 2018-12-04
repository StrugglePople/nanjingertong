import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpertCommonListPage } from './expert-common-list';
import {EmptyViewComponentModule} from "../../../../components/empty-view/empty-view.module";

@NgModule({
  declarations: [
    ExpertCommonListPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpertCommonListPage),
    EmptyViewComponentModule
  ],
  exports: [
    ExpertCommonListPage
  ]
})
export class ExpertCommonListPageModule {}
