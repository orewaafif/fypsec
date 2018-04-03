import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedbackModal } from './feedback-modal';

@NgModule({
  declarations: [
    FeedbackModal,
  ],
  imports: [
    IonicPageModule.forChild(FeedbackModal),
  ],
  exports: [
    FeedbackModal
  ]
})
export class FeedbackModalPageModule {}
