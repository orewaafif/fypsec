import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountModal } from './account-modal';

@NgModule({
  declarations: [
    AccountModal,
  ],
  imports: [
    IonicPageModule.forChild(AccountModal),
  ],
  exports:[
    AccountModal
  ]
})
export class AccountModalModule {}
