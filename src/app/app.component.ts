import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login'
import { HomePage } from '../pages/home/home';
import { PerfilPage } from '../pages/perfil/perfil';
import { MispedidosPage } from '../pages/mispedidos/mispedidos';
import { VendedorPage } from '../pages/vendedor/vendedor';
import { TransportistaPage } from '../pages/transportista/transportista';
import { ApiClientService } from '../cliente';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  activePage:any;
  public nombre:any;
  public data:any;

  pages: Array<{name: string, title: string, component: any}>;

  constructor(public events: Events, public api:ApiClientService, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    console.log("Holaa");
    this.events.subscribe('userInfo', (userInfo)=>{
      this.data=userInfo.body;
      this.nombre = userInfo.body.name;
      console.log(this.data);
      console.log(userInfo.body.name);
    });
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { name: this.nombre , title: 'Ir a mi perfil', component: PerfilPage },
      { name: '', title: 'Novedades', component: HomePage },
      { name:'', title: 'Mis Pedidos', component: MispedidosPage }
      
    ];

    this.activePage = this.pages[1];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component,this.data);
    this.activePage = page;
  }

  checkActive(page){
    return page == this.activePage;
  }
}

