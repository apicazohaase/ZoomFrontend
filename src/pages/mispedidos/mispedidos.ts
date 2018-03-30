import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiClientService } from '../../cliente';


@IonicPage()
@Component({
  selector: 'page-mispedidos',
  templateUrl: 'mispedidos.html',
})
export class MispedidosPage {
  public id:any;
  public misPedidos = new Array();

  constructor(public api:ApiClientService, public navCtrl: NavController, public navParams: NavParams) {
    this.id = '1';
    this.misPedidos = [];
    this.api.getOrdersOfAClient(this.id).subscribe(
      result=>{
        this.misPedidos = result.body;
        
        for(var i=0;i<result.body.length;i++){
          if(result.body[i].product == "resource:zoom.app.Product#1"){
            this.misPedidos[i].product = 'Logitech G Pro';
          }else if(result.body[i].product == "resource:zoom.app.Product#2"){
            this.misPedidos[i].product = 'Logitech G213';
          }else if(result.body[i].product == "resource:zoom.app.Product#3"){
            this.misPedidos[i].product = 'ASUS MX239H';
          }else if(result.body[i].product == "resource:zoom.app.Product#4"){
            this.misPedidos[i].product = 'Logitech G430';
          }
        }
        console.log(this.misPedidos);
      },
      error=>{
        console.log(error);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MispedidosPage');
  }

}
