import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiClientService } from '../../cliente/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  
 

  constructor(public api: ApiClientService, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.myForm = this.createMyForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  volver(){
    this.navCtrl.popToRoot();
  }

  createMyForm(){
    return this.formBuilder.group({
      passwordE: ["",Validators.compose([
        Validators.required
      ])],
      password2E: ["",Validators.compose([
        Validators.required
      ])],
      mailE: ["",Validators.compose([
        Validators.required
      ])],
      telefonoE: ["",Validators.compose([
        Validators.required
      ])],
      nombreE: ["",Validators.compose([
        Validators.required
      ])],
      ciudadE: ["",Validators.compose([
        Validators.required
      ])],
      calleE: ["",Validators.compose([
        Validators.required
      ])],
      localidadE: ["",Validators.compose([
        Validators.required
      ])]
    });
  }

  signUp(){
    console.log("holi");
    this.saveData();
    console.log(this.nombre);
    console.log(this.mail);
    console.log(this.passwordE);
    console.log(this.password2E);
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
        },
        error=>{
          this.error=true;
          console.log(error);
        }
      )
    
      if(this.error==false){
        this.navCtrl.push(SignupPage);
      }
    }

    saveData(){
      this.nombre=this.myForm.value.nombreE;
      this.password=this.myForm.value.passwordE;
      this.password2=this.myForm.value.password2E;
      this.calle=this.myForm.value.calleE;
      this.mail=this.myForm.value.mailE;
      this.localidad=this.myForm.value.localidadE;
      this.ciudad=this.myForm.value.ciudadE;
      this.telefono=this.myForm.value.telefonoE;

    }

}
