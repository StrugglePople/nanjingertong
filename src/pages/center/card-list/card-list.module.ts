import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardListPage } from './card-list';
import {ModuleSeparateComponentModule} from "../../../components/module-separate/module-separate.module";
import {EmptyViewComponentModule} from "../../../components/empty-view/empty-view.module";

@NgModule({
  declarations: [
    CardListPage,
  ],
  imports: [
    IonicPageModule.forChild(CardListPage),
    ModuleSeparateComponentModule,
    EmptyViewComponentModule
  ],
  exports: [
    CardListPage
  ]
})
export class CardListPageModule {}
