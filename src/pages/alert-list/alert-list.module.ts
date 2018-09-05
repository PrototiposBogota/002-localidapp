import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlertListPage } from './alert-list';

@NgModule({
  declarations: [
    AlertListPage,
  ],
  imports: [
    IonicPageModule.forChild(AlertListPage),
  ],
})
export class AlertListPageModule {}
