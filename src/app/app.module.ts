import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import { ForgotpassPage } from '../pages/forgotpass/forgotpass';
import { PerfilPage } from '../pages/perfil/perfil';
import { MispedidosPage } from '../pages/mispedidos/mispedidos';
import { ApiClientService } from '../cliente';
import { HttpClientModule, HttpClient } from '@angular/common/http';
//import { ListenApiProvider } from '../providers/server-api/server-api':



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ForgotpassPage,
    PerfilPage,
    MispedidosPage

    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ForgotpassPage,
    PerfilPage,
    MispedidosPage
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiClientService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
