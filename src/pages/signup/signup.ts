import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiClientService } from '../../cliente/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public myForm: FormGroup;
  public error:boolean;
  public nombre:any;
  public password:any;
  public password2:any;
  public mail:any;
  public telefono:any;
  public ciudad:any;
  public calle:any;
  public localidad:any;
  
  public errorE:boolean;
  public nombreE:any;
  public passwordE:any;
  public password2E:any;
  public mailE:any;
  public telefonoE:any;
  public ciudadE:any;
  public calleE:any;
  public localidadE:any;

  
  constructor(public api: ApiClientService, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  volver(){
    this.navCtrl.popToRoot();
  }

  

  signUp(){
    let loading = this.loadingCtrl.create({
      content: 'Creating account...'
    });
    loading.present();
    
    let sign = {
      "$class": "zoom.app.Register",
      "client": {
        "$class": "zoom.app.Client",
        "participante": "CLIENT",
        "id": "1",
        "name": this.nombre,
        "password": this.password,
        "confirmPassword": this.password2,
        "mail": this.mail,
        "number": this.telefono,
        "city": this.ciudad,
        "localidad": this.localidad,
        "street": this.calle
      }
    };
    console.log("holi2");
  
      this.api.Register(sign).subscribe(
        result => {
          console.log(result);
          this.error=false;
          console.log("enviado");
          this.navCtrl.popToRoot();
          loading.dismiss();
        },
        error=>{
          this.error=true;
          console.log(error);
          loading.dismiss();
        }
      )
    
      if(this.error==false){
        this.navCtrl.push(SignupPage);
      }
    }

}
