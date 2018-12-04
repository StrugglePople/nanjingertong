import { NgModule } from '@angular/core';
import { IonicModule} from 'ionic-angular';
import {CommonModule} from "@angular/common";
import {SafeHtmlPipe} from './safe-html/safe-html'
@NgModule({
  declarations: [
    SafeHtmlPipe
  ],
  imports: [
    // IonicModule.forRoot(PipesModule)
    CommonModule
  ],
  exports: [
    SafeHtmlPipe
  ]
})
export class PipesModule {}
