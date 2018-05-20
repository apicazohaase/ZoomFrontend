import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginLoaderClientPage } from './login-loader-client';

@NgModule({
  declarations: [
    LoginLoaderClientPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginLoaderClientPage),
  ],
})
export class LoginLoaderClientPageModule {}
