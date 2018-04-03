import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainreportPage } from './mainreport';

@NgModule({
  declarations: [
    MainreportPage,
  ],
  imports: [
    IonicPageModule.forChild(MainreportPage),
  ],
  exports: [
    MainreportPage
  ]
})
export class MainreportPageModule {}
