import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MousePage } from './mouse';

@NgModule({
  declarations: [
    MousePage,
  ],
  imports: [
    IonicPageModule.forChild(MousePage),
  ],
})
export class MousePageModule {}
