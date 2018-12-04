import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModuleSeparateComponent } from './module-separate';

@NgModule({
  declarations: [
    ModuleSeparateComponent,
  ],
  imports: [
    IonicPageModule.forChild(ModuleSeparateComponent),
  ],
  exports: [
    ModuleSeparateComponent
  ]
})
export class ModuleSeparateComponentModule {}
