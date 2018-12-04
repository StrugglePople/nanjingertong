import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmptyViewComponent } from './empty-view';

@NgModule({
  declarations: [
    EmptyViewComponent,
  ],
  imports: [
    IonicPageModule.forChild(EmptyViewComponent),
  ],
  exports: [
    EmptyViewComponent
  ]
})
export class EmptyViewComponentModule {}
