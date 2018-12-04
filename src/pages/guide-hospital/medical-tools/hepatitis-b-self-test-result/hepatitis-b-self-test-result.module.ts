import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HepatitisBSelfTestResultPage } from './hepatitis-b-self-test-result';

@NgModule({
  declarations: [
    HepatitisBSelfTestResultPage,
  ],
  imports: [
    IonicPageModule.forChild(HepatitisBSelfTestResultPage),
  ],
  exports: [
    HepatitisBSelfTestResultPage
  ]
})
export class HepatitisBSelfTestResultModule {}
