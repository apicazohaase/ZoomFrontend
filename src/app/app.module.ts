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
import { OfertaPageModule } from '../pages/oferta/oferta.module';
//import { ListenApiProvider } from '../providers/server-api/server-api':
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { OfertaPage } from '../pages/oferta/oferta';
import { LoginLoaderPage } from '../pages/login-loader/login-loader';
import { LoginLoaderClientPage } from '../pages/login-loader-client/login-loader-client';

import { IonicStorageModule } from '@ionic/storage';

import { LoginLoaderPageModule } from '../pages/login-loader/login-loader.module';
import { LoginLoaderClientPageModule } from '../pages/login-loader-client/login-loader-client.module';

import { Timer } from '../components/countdown-timer/timer';
import { EmptyPage } from '../pages/empty/empty';

import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { TimerProgress } from '../components/timer-progress/timer-progress';
import { EmptyPageModule } from '../pages/empty/empty.module';
import { ModalPage } from '../pages/modal/modal';
import { ModalPageModule } from '../pages/modal/modal.module';
import { TrackingPage } from '../pages/tracking/tracking';
import { TrackingPageModule } from '../pages/tracking/tracking.module';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Timer,
    TimerProgress
    
  ],
  imports: [
    BrowserModule,
    ForgotpassPageModule,
    SignupPageModule,
    TransportistaPageModule,
    VendedorPageModule,
    LoginPageModule,
    PerfilPageModule,
    LoginLoaderClientPageModule,
    LoginLoaderPageModule,
    EmptyPageModule,
    MousePageModule,
    OfertaPageModule,
    KeyboardPageModule,
    MispedidosPageModule,
    ModalPageModule,
    TrackingPageModule,
    AuricularesPageModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EmptyPage,
    ModalPage,
    LoginPage,
    TrackingPage,
    MousePage,
    KeyboardPage,
    TransportistaPage,
    LoginLoaderClientPage,
    LoginLoaderPage,
    VendedorPage,
    OfertaPage,
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
    BarcodeScanner,
    Toast,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Timer,
    TimerProgress
  ]
})
export class AppModule {}
