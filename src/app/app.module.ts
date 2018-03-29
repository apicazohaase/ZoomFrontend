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
import { TransportistaPage } from '../pages/transportista/transportista';
import { VendedorPage } from '../pages/vendedor/vendedor';
import { ForgotpassPageModule } from '../pages/forgotpass/forgotpass.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { TransportistaPageModule } from '../pages/transportista/transportista.module';
import { VendedorPageModule } from '../pages/vendedor/vendedor.module';
import { LoginPageModule } from '../pages/login/login.module';
import { PerfilPageModule } from '../pages/perfil/perfil.module';
import { MispedidosPageModule } from '../pages/mispedidos/mispedidos.module';
import { KeyboardPage } from '../pages/keyboard/keyboard';
import { MousePage } from '../pages/mouse/mouse';
import { MousePageModule } from '../pages/mouse/mouse.module';
import { KeyboardPageModule } from '../pages/keyboard/keyboard.module';
import { AuricularesPage } from '../pages/auriculares/auriculares';
import { AuricularesPageModule } from '../pages/auriculares/auriculares.module';
//import { ListenApiProvider } from '../providers/server-api/server-api':



@NgModule({
  declarations: [
    MyApp,
    HomePage

    
  ],
  imports: [
    BrowserModule,
    ForgotpassPageModule,
    SignupPageModule,
    TransportistaPageModule,
    VendedorPageModule,
    LoginPageModule,
    PerfilPageModule,
    MousePageModule,
    KeyboardPageModule,
    MispedidosPageModule,
    AuricularesPageModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MousePage,
    KeyboardPage,
    TransportistaPage,
    VendedorPage,
    AuricularesPage,
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
