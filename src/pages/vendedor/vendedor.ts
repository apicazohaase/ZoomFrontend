import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ApiClientService } from '../../cliente';


@IonicPage()
@Component({
  selector: 'page-vendedor',
  templateUrl: 'vendedor.html',
})
export class VendedorPage {
  public pedidosList = new Array();
  public visible:boolean;
  public mensaje:string;
  public queProducto:string;

  constructor(public api:ApiClientService, public navCtrl: NavController, public navParams: NavParams, public events:Events) {
    this.pedidosList = [];
    this.visible=false;
    console.log("holi");/*
    this.events.subscribe('orderCreated',
  (orderCreated)=>{*/
    this.api.getAllOrders().subscribe(
      result=>{
        console.log("Hola");
        this.pedidosList = result.body;
        console.log(result.body);
        console.log(result.body[0].product)
        for(var i=0;i<result.body.length;i++){
          if(result.body[i].product == "resource:zoom.app.Product#1"){
            this.pedidosList[i].product = 'Logitech G Pro';
          }else if(result.body[i].product == "resource:zoom.app.Product#2"){
            this.pedidosList[i].product = 'Logitech G213';
          }else if(result.body[i].product == "resource:zoom.app.Product#3"){
            this.pedidosList[i].product = 'ASUS MX239H';
          }else if(result.body[i].product == "resource:zoom.app.Product#4"){
            this.pedidosList[i].product = 'Logitech G430';
          }
        }
        console.log(this.pedidosList[0].product);
}, error=>{
        console.log(error);
      });/*
  });
    */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendedorPage');
  }

  logout(){
    this.navCtrl.setRoot(LoginPage);
  }

  confirmarPedido(i){
    
    
    if(i.product == 'Logitech G Pro' ){
      this.queProducto = "resource:zoom.app.Product#1";
    }else if(i.product == 'Logitech G213' ){
      this.queProducto = "resource:zoom.app.Product#2";
    }else if(i.product == 'ASUS MX239H'){
      this.queProducto = "resource:zoom.app.Product#3";
    }else if(i.product == 'Logitech G430' ){
      this.queProducto = "resource:zoom.app.Product#4";
    }

    let confirmation = {
      "$class": "zoom.app.ConfirmationOrder",
      "order": String(i.id),
      "vendor": i.owner,
      "product": this.queProducto
    }

    this.api.confirmOrder(confirmation).subscribe(
      result=>{
        console.log("Order confirmed");
        this.visible=true;
        this.mensaje = "El pedido " + result.body.id + " ha sido confirmado";
      },
      error=>{
        console.log(error);
      }
    )

  }


}
