import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events, ModalController } from 'ionic-angular';
import { ApiClientService } from '../../cliente';
import { AnonymousSubject } from 'rxjs/Subject';
import { ModalPage } from '../modal/modal';


@IonicPage()
@Component({
  selector: 'page-mouse',
  templateUrl: 'mouse.html',
})
export class MousePage {
  public enStock:boolean;
  public id:string;
  public peso:any;
  public precio:any;
  public nombre:any;
  public descripcion:any;
  public status:any;
  public direccion:any;
  public idPersona:any;

  constructor(public alertCtrl:AlertController, public modalCtrl: ModalController,public api:ApiClientService, public navCtrl: NavController, public navParams: NavParams, public events:Events) {
    this.idPersona = this.navParams.data;
    this.id='1';
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

  openModal(pageName) {
    this.modalCtrl.create(pageName, {id:this.id}, { cssClass: 'inset-modal' }).present();
  }

  comprarProducto(){
    this.openModal(ModalPage);
  }

  comprar(){
    let compra = {
      
        "$class": "zoom.app.BuyAProduct",
        "client": "resource:zoom.app.Client#" + this.idPersona,
        "transport": "resource:zoom.app.Transport#1",
        "vendor": "resource:zoom.app.Vendor#1",
        "product": "resource:zoom.app.Product#" + this.id
      };
      this.api.compraDeProducto(compra).subscribe(
        result=>{
          this.events.publish('ordersInfo',result);
          console.log("Success");
        },
        error=>{
          console.log(error)
        });
    

  }

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

}
