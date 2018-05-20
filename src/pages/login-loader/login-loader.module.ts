import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginLoaderPage } from './login-loader';

@NgModule({
  declarations: [
    LoginLoaderPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginLoaderPage),
  ],
})
export class LoginLoaderPageModule {}
