import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { ForgotpassPage } from '../forgotpass/forgotpass';
import { HomePage } from '../home/home';

import { ApiClientService } from '../../cliente/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendedorPage } from '../vendedor/vendedor';
import { TransportistaPage } from '../transportista/transportista';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public myForm: FormGroup;
  public nombre:any;
  public password:any;

  public nombreE:any;
  public passwordE:any;

  public typeuser:string;
  public showme1: boolean;
  public showme2:boolean;
  public error:any;
  
  
  public vendor:string="resource:zoom.app.Vendor#1";
  public client:string="resource:zoom.app.Client#1";
  public transport:string="resource:zoom.app.Transport#1";
  public user:string;
  constructor(public api:ApiClientService, public formBuilder:FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.myForm = this.createMyForm();
    this.typeuser="";
    this.showme1 = false;
    this.showme2=false;
    this.error=false;
  }


  createMyForm(){
    return this.formBuilder.group({
      nombreE: ["",Validators.compose([
        Validators.required
      ])],
      passwordE: ["",Validators.compose([
        Validators.required
      ])]
    });
  }

  saveData(){
    this.nombre=this.myForm.value.nombreE;
    this.password=this.myForm.value.passwordE;
  }


  onSelectChange(selectedValue:any){
    if(this.typeuser=="Vendedor"){
      this.user = this.vendor;
    }else if(this.typeuser=="Cliente"){
      this.user = this.client;
    }else if(this.typeuser=="Transportista"){
      this.user = this.transport;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  

tryLogin(){
  if(this.myForm.get("nombreE").hasError("required")){
    this.showme1=true;
  }else{
    this.showme1=false;
  }
  if(this.myForm.get("passwordE").hasError("required")){
    this.showme1=true;
  }else{
    this.showme1=false;
  }
  if(this.typeuser==""){
    this.showme2=true;
  }else{
    this.showme2=false;
  }
  if(this.showme1==false){
    this.login();
  }
}

login(){
  
  this.saveData();
console.log(this.nombre);
console.log(this.password);
console.log(this.user);
  let log = {

    "$class": "zoom.app.Login",
    "defaultUser": this.user,
    "name": this.nombre,
    "password": this.password
  };

  this.api.login(log).subscribe(
    result => {
      console.log(result);
      this.error=false;
      if(this.typeuser=="Cliente"){
        this.navCtrl.setRoot(HomePage);
      }else if(this.typeuser=="Transportista"){
        this.navCtrl.setRoot(TransportistaPage);
      }else if(this.typeuser=="Vendedor"){
        this.navCtrl.setRoot(VendedorPage);
      }
      
    },
    error=>{
      this.error=true;
      console.log(error);
    }
  )
  
  
  
}

toRegister(){
  this.navCtrl.push(SignupPage);
}
  


forgotPass(){
  this.navCtrl.push(ForgotpassPage);
}

}
