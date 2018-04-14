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
  public usuario:any;
  public saveChanges:boolean;
  public correo:any;
  public direccion:any;
  public localidad:any;
  public ciudad:any;
  public telefono:any;
  public password:string;
  public canWrite:boolean;
  public password2:string;
  public data:any;
  public personId:any;

  constructor(public api: ApiClientService, public navCtrl: NavController, public navParams: NavParams) {
    this.saveChanges=false;
    this.canWrite=false;
    this.data = this.navParams.data;
    let idLong = this.data.defaultUser;
    let splitted = idLong.split("#");
    this.personId = splitted[1];
    
    this.api.getClient(this.personId).subscribe(
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

saveProfile(){
  let data = {
   
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
  console.log(data);
  this.api.editProfile(this.personId,data).subscribe(
    result => {
      this.saveChanges=false;
      console.log("PROFILE UPDATED")
    },
    error => {
      console.log(error);
    });
}

  editProfile(){
    this.canWrite=true;
    this.saveChanges=true;
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  logout(){
    this.navCtrl.setRoot(LoginPage);
  }




}
