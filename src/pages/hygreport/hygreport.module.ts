import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HygreportPage } from './hygreport';

@NgModule({
  declarations: [
    HygreportPage,
  ],
  imports: [
    IonicPageModule.forChild(HygreportPage),
  ],
  exports: [
    HygreportPage
  ]
})
export class HygreportPageModule {}
