import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { ForgotpassPage } from '../forgotpass/forgotpass';
import { HomePage } from '../home/home';
import { Nav } from 'ionic-angular';
import { ApiClientService } from '../../cliente/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendedorPage } from '../vendedor/vendedor';
import { TransportistaPage } from '../transportista/transportista';
import { EmptyPage } from '../empty/empty';




@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public myForm: FormGroup;
  public nombre:any;
  public password:any;
  rootPage:any = 'EmptyPage';
  public nombreE:any;
  public passwordE:any;
  public id:any;
  public typeuser:string;
  public showme1: boolean;
  public showme2:boolean;
  public error:any;
  @ViewChild (Nav) nav: Nav;
  
  public vendor:string="resource:zoom.app.Vendor#1";
  public client:string="resource:zoom.app.Client#";
  public transport:string="resource:zoom.app.Transport#1";
  public user:string;
  constructor(public events:Events,public loadingCtrl: LoadingController,public api:ApiClientService, public formBuilder:FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.myForm = this.createMyForm();
    this.typeuser="";
    this.showme1 = false;
    this.showme2=false;
    this.error=false;
    this.events.publish("ordersInfo");
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
    String(this.nombre);
    this.password=this.myForm.value.passwordE;
  }


  onSelectChange(selectedValue:any){
    if(this.typeuser=="Vendedor"){
      this.user = this.vendor;
      this.events.publish('ordersInfo');
    }else if(this.typeuser=="Cliente"){
      this.user = this.client;
      this.events.publish('ordersInfo');
    }else if(this.typeuser=="Transportista"){
      this.user = this.transport;
      this.events.publish('ordersInfo');
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
let loading = this.loadingCtrl.create({
  content: 'Logging in...'
});
loading.present();
  this.api.getAllClients().subscribe(
    result=>{
      for(var i=0;i<result.body.length;i++){
        if(result.body[i].name==this.nombre){
          this.id = result.body[i].id;
          if(this.typeuser=="Cliente"){
            this.user = this.client + this.id;
          }
          //this.user = this.client + this.id;
          let log = {
            
                "$class": "zoom.app.Login",
                "defaultUser": this.user,
                "name": this.nombre,
                "password": this.password
              };
             /* let loading = this.loadingCtrl.create({
                content: 'Logging in...'
              });
              loading.present();*/
            
              this.api.login(log).subscribe(
                result => {
                  this.events.publish('userInfo',result);
                  console.log(result);
                  this.error=false;
                  if(this.typeuser=="Cliente"){
                    this.navCtrl.setRoot(HomePage,log);
                  }else if(this.typeuser=="Transportista"){
                    this.navCtrl.setRoot(TransportistaPage);
                  }else if(this.typeuser=="Vendedor"){
                    this.navCtrl.setRoot(VendedorPage);
                  }
                  loading.dismiss();
                },
                error=>{
                  this.error=true;
                  console.log(error);
                  loading.dismiss();
                }
              )
              
        }
        //this.user = this.client + this.id;
        
      }
    },
    error=>{
      console.log(error);
      loading.dismiss();
    });
}

toRegister(){
  this.navCtrl.push(SignupPage);
}
  


forgotPass(){
  this.navCtrl.push(ForgotpassPage);
}

}
