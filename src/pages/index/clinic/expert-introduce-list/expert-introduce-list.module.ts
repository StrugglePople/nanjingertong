import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ExpertIntroduceList} from "./expert-introduce-list";

@NgModule({
  declarations: [
    ExpertIntroduceList,
  ],
  imports: [
    IonicPageModule.forChild(ExpertIntroduceList),
  ],
  exports: [
    ExpertIntroduceList
  ]
})
export class ExpertIntroduceListModule {}
