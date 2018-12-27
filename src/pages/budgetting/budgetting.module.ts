import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BudgettingPage } from './budgetting';

@NgModule({
  declarations: [
    BudgettingPage,
  ],
  imports: [
    IonicPageModule.forChild(BudgettingPage),
  ],
})
export class BudgettingPageModule {}
