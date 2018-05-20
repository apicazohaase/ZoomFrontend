import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events, ModalController, ViewController } from 'ionic-angular';
import { ApiClientService } from '../../cliente';
import { ModalPage } from '../modal/modal';



@IonicPage()
@Component({
  selector: 'page-oferta',
  templateUrl: 'oferta.html',
})
export class OfertaPage {
  public enStock:boolean;
  public id:string;
  public peso:any;
  public precio:any;
  public nombre:any;
  public descripcion:any;
  public status:any;
  public direccion:any;
  public idPersona:any;

  rootPage:any;

  constructor(public viewCtrl:ViewController, public alertCtrl:AlertController,public modalCtrl: ModalController, public api:ApiClientService, public navCtrl: NavController, public navParams: NavParams, public events:Events) {
    this.id='3';
    this.idPersona = this.navParams.data;
    this.api.getAProduct(this.id).subscribe(
      result => {
        this.peso = result.body.weight + '' + 'kg';
        this.precio = result.body.price + '' + '€';
        this.descripcion = result.body.description;
        this.nombre = result.body.name;
        this.status = result.body.status;
        if(this.status == "NOTSOLD"){
          this.enStock=true;
        }else{
          this.enStock=false;
        }

          
      },
      error => {
      console.log(error);
    });

    this.api.getClient(this.idPersona).subscribe(
      result=>{
        console.log('Cliente ' + result.body);
        this.direccion = 'Enviar a ' + '' + result.body.street;
      },
      error => {
        console.log(error);
      });

  }

  comprarProducto(){
    this.openModal(ModalPage);
  }

  

  openModal(pageName) {
    this.modalCtrl.create(pageName, {id:this.id}, { cssClass: 'inset-modal' }).present();
  }
/*
  presentAlert(){
    const alert = this.alertCtrl.create({
      title: "¿Está seguro que quiere comprar el producto?",
      buttons: [
        {
          text: "SI",
          role: "OK",
          handler: () => {
            this.comprar();
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
  */
  ionViewDidLoad() {
    console.log('ionViewDidLoad KeyboardPage');
  }


}
