import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ApiClientService } from '../../cliente/index';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  public seeSettings:boolean;
  public usuario:any;
  public correo:any;
  public direccion:any;
  public localidad:any;
  public ciudad:any;
  public telefono:any;
  public id:string;
  public password:string;
  public canWrite:boolean;
  public password2:string;

  constructor(public api: ApiClientService, public navCtrl: NavController, public navParams: NavParams) {
    this.seeSettings=false;
    this.canWrite=false;
    this.id= '1';
    this.api.getClient(this.id).subscribe(
      result => {
        console.log(result);
          this.password = result.body.password;
          this.usuario= result.body.name;     
          this.correo = result.body.mail; 
          this.telefono = result.body.number; 
          this.ciudad = result.body.city;
          this.localidad = result.body.localidad;
          this.direccion = result.body.street;
      },
      error => {
      console.log(error);
    });
  }

actualizarInfo(){
  let data = {
    "$class": "zoom.app.Register",
    "client": {
      "$class": "zoom.app.Client",
      "participante": "CLIENT",
      "name": this.usuario,
      "password": this.password,
      "confirmPassword": this.password,
      "mail": this.correo,
      "number": this.telefono,
      "city": this.ciudad,
      "localidad": this.localidad,
      "street": this.direccion
    }
  }
  this.api.editProfile(this.id,data).subscribe(
    result => {

    },
    error => {
      console.log(error);
    });
}

  getParameters(){
    this.api.getClient(this.id).subscribe(
      result => {
        console.log(result);
          this.usuario= result.body.name;     
          this.correo = result.body.mail; 
          this.telefono = result.body.number; 
          this.ciudad = result.body.city;
          this.localidad = result.body.localidad;
          this.direccion = result.body.street;
      },
      error => {
      console.log(error);
    });
    


  }

  showSettings(){
    this.seeSettings=true;
    this.canWrite=true;
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  logout(){
    this.navCtrl.setRoot(LoginPage);
  }




}
