import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MemberSelectComponent } from './member-select';

@NgModule({
  declarations: [
    MemberSelectComponent,
  ],
  imports: [
    IonicModule
  ],
  exports: [
    MemberSelectComponent
  ]
})
export class MemberSelectComponentModule {}
