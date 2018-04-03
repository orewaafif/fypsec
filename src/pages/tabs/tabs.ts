import { Component } from '@angular/core';

import { MainreportPage } from '../mainreport/mainreport';
import { HygreportPage } from '../hygreport/hygreport';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'AccountPage';
  tab2Root = MainreportPage;
  tab3Root = HygreportPage;

  constructor() {
  }


}
