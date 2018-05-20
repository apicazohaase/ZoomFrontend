import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ApiClientService } from '../../cliente/index';
import { Storage } from '@ionic/storage';

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
  public recuerdame:any;
  public creditCard:any;
  user:any;

  constructor(public api: ApiClientService,private storage:Storage, public alertCtrl:AlertController, public navCtrl: NavController, public navParams: NavParams) {
    /*
    this.saveChanges=false;
    this.recuerdame="Recuerdáme";
    this.canWrite=false;
    this.storage.get('user').then((result)=>{
      console.log(result);
      this.user=result;
      this.personId = result.defaultUser.split("#")[1];
      console.log(this.personId);

    })
    
    this.api.getClient(this.personId).subscribe(
      result => {
        console.log(result);
          this.password = result.body.password;
          let tarjeta = result.body.tarjetaCredito;
          this.usuario= result.body.name;     
          this.correo = result.body.mail; 
          this.telefono = result.body.number; 
          this.ciudad = result.body.city;
          this.localidad = result.body.localidad;
          this.direccion = result.body.street;
          this.creditCard = tarjeta.substring(0,4) + "**************";
      },
      error => {
      console.log(error);
    });
    */
  }

ionViewDidLoad(){
  this.saveChanges=false;
    this.recuerdame="Recuerdáme";
    this.canWrite=false;
    this.storage.get('user').then((result)=>{
      console.log(result);
      this.user=result;
      this.personId = result.defaultUser.split("#")[1];
      console.log(this.personId);
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
            if(result.body.tarjetaCredito!=''){
            this.creditCard = result.body.tarjetaCredito.substring(0,4) + "**************";
            }
        },
        error => {
        console.log(error);
      });
      

    })
    
    
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
      "street": this.direccion,
      "tarjetaCredito": this.creditCard
    
  }
  console.log(data);
  this.api.editProfile(this.personId,data).subscribe(
    result => {
      this.saveChanges=false;
      this.canWrite=false;
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
  
  seguroLogOut(){
    this.presentAlert();
  }
  presentAlert(){
    const alert = this.alertCtrl.create({
      title: "¿Seguro que quiere salir?",
      buttons: [
        {
          text: "SI",
          role: "OK",
          handler: () => {
            this.logout();
          }
        },
        {
          text: "NO",
          role: "CANCEL"
        }
      ]
    });
    alert.present();
  }
  logout(){
    this.navCtrl.setRoot(LoginPage);
  }




}
