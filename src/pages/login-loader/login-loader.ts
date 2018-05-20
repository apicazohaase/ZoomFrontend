import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransportistaPage } from '../transportista/transportista';
import { VendedorPage } from '../vendedor/vendedor';


@IonicPage()
@Component({
  selector: 'page-login-loader',
  templateUrl: 'login-loader.html',
})
export class LoginLoaderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginLoaderPage');
    console.log(this.navParams.data);
    var this1=this;
    setTimeout(function() {
      if(this1.navParams.data == 'Vendedor'){
        this1.navCtrl.setRoot(VendedorPage);
      }
      else if(this1.navParams.data == 'Transportista'){
        this1.navCtrl.setRoot(TransportistaPage);
      }
      
  }, 3000);
  }
}
